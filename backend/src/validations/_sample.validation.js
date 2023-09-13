const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getSamples = Joi.object().keys({
	query: Joi.object().keys({
		name: Joi.string(),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
});

const getSample = Joi.object().keys({
	params: Joi.object().keys({
		sampleId: Joi.string().required().custom(objectId),
	}),
});

const createSample = Joi.object().keys({
	body: Joi.object().keys({
		name: Joi.string().required(),
		sample: Joi.string().custom(objectId).required(),
		type: Joi.string()
			.valid("development", "test", "production")
			.required(),
		isValid: Joi.boolean().required(),
		when: Joi.date().required(),
		secret_key: Joi.string().min(8).required(),
	}),
});

const updateSample = Joi.object().keys({
	params: Joi.object().keys({
		sampleId: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string().required(),
		user: Joi.string().custom(objectId),
		type: Joi.string()
			.valid("development", "test", "production")
			.required(),
		isValid: Joi.boolean().required(),
		when: Joi.date().required(),
		secret_key: Joi.string().min(8).required(),
	}),
});

const deleteSample = Joi.object().keys({
	params: Joi.object().keys({
		sampleId: Joi.string().required().custom(objectId),
	}),
});

module.exports = {
	getSamples,
	getSample,
	createSample,
	updateSample,
	deleteSample,
};
