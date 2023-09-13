const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getProducts = {
	query: Joi.object().keys({
		name: Joi.string(),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getProduct = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
};

const createProduct = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		category: Joi.string()
			.required()
			.valid("Plant", "Pot", "Soil", "Tool"),
		image: Joi.any(),
		stocks: Joi.number(),
	}),
};

const updateProduct = {
	params: Joi.object().keys({
		productId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		price: Joi.number(),
		category: Joi.string().valid("Plant", "Pot", "Soil", "Tool"),
		image: Joi.any(),
		stocks: Joi.number(),
	}),
};

const deleteProduct = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
};

const createPlantProduct = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		category: Joi.string().valid("Plant", "Pot", "Soil", "Tool"),
		image: Joi.any(),
		stocks: Joi.number().default(100),
		height: Joi.number().required(),
		pot_diameter: Joi.number().required(),
		type: Joi.string().valid("Indoor", "Outdoor", "Indoor and Outdoor"),
		light_requirements: Joi.number().required(),
		humidity_needs: Joi.number().required(),
		watering_needs: Joi.number().required(),
		repotting: Joi.number().required(),
		pet_friendly: Joi.number().required(),
	}),
};

const updatePlantProduct = {
	params: Joi.object().keys({
		productId: Joi.required().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		price: Joi.number(),
		category: Joi.string().valid("Plant", "Pot", "Soil", "Tool"),
		image: Joi.any(),
		stocks: Joi.number().default(100),
		height: Joi.number(),
		pot_diameter: Joi.number(),
		type: Joi.string().valid("Indoor", "Outdoor", "Indoor and Outdoor"),
		light_requirements: Joi.number(),
		humidity_needs: Joi.number(),
		watering_needs: Joi.number(),
		repotting: Joi.number(),
		pet_friendly: Joi.number(),
	}),
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	createPlantProduct,
	updatePlantProduct,
};
