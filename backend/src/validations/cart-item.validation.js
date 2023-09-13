const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getCartItems = Joi.object().keys({
	params: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
	}),
	query: Joi.object().keys(),
	body: Joi.object().keys(),
});

const getCartItem = Joi.object().keys({
	params: Joi.object().keys({
		cartItemId: Joi.string().required().custom(objectId),
	}),
});

const createCartItem = Joi.object().keys({
	body: Joi.object().keys({
		customer: Joi.string().required().custom(objectId),
		product: Joi.string().required().custom(objectId),
		quantity: Joi.number().min(1).default(1),
	}),
});

const updateCartItem = Joi.object().keys({
	params: Joi.object().keys({
		cartItemId: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		quantity: Joi.number().min(1).default(1),
	}),
});

const deleteCartItem = Joi.object().keys({
	params: Joi.object().keys({
		cartItemId: Joi.string().required().custom(objectId),
	}),
});

module.exports = {
	getCartItems,
	getCartItem,
	createCartItem,
	updateCartItem,
	deleteCartItem,
};
