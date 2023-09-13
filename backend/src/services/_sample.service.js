const httpStatus = require("http-status");
const { Sample } = require("../models");
const ApiError = require("../utils/ApiError");

const createSample = async (sampleBody) => {
	if (await Sample.isNameTaken(sampleBody.name)) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Name already taken");
	}
	return Sample.create(sampleBody);
};

const querySamples = async (filter, options) => {
	const samples = await Sample.paginate(filter, options);
	return samples;
};

const getSampleById = async (id) => {
	return Sample.findById(id);
};

const getSampleByName = async (name) => {
	return Sample.findOne({ name });
};

const updateSampleById = async (sampleId, updateBody) => {
	const sample = await getSampleById(sampleId);

	if (!sample) {
		throw new ApiError(httpStatus.NOT_FOUND, "Sample not found");
	}
	if (
		updateBody.name &&
		(await Sample.isNameTaken(updateBody.name, sampleId))
	) {
		throw new ApiError();
	}

	Object.assign(sample, updateBody);
	await sample.save();
	return sample;
};

const deleteSampleById = async (sampleId) => {
	const sample = await getSampleById(sampleId);
	if (!sample) {
		throw new ApiError(httpStatus.NOT_FOUND, "Sample not found");
	}
	await sample.deleteOne();
	return sample;
};

module.exports = {
	createSample,
	querySamples,
	getSampleById,
	getSampleByName,
	updateSampleById,
	deleteSampleById,
};
