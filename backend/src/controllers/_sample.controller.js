const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { sampleService } = require("../services");

const createSample = catchAsync(async (req, res) => {
	const sample = await sampleService.createSample(req.body);

	res.status(httpStatus.CREATED).send(sample);
});

const getSamples = catchAsync(async (req, res) => {
	const filter = pick(req.query, ["name", "type"]);
	const options = pick(req.query, ["sortBy", "limit", "page"]);
	const result = await sampleService.querySamples(filter, options);

	res.send(result);
});

const getSample = catchAsync(async (req, res) => {
	const sample = await sampleService.getSampleById(req.params.sampleId);
	if (!sample) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	res.send(sample);
});

const updateSample = catchAsync(async (req, res) => {
	const sample = await sampleService.updateSampleById(
		req.params.sampleId,
		req.body
	);
	res.send(sample);
});

const deleteSample = catchAsync(async (req, res) => {
	await sampleService.deleteSampleById(req.params.sampleId);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	createSample,
	getSamples,
	getSample,
	updateSample,
	deleteSample,
};
