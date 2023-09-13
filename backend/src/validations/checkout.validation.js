const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getCheckouts = Joi.object().keys({
	params: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
	}),
	query: Joi.object().keys(),
	body: Joi.object().keys(),
});

const getCheckout = Joi.object().keys({
	params: Joi.object().keys({
		checkoutId: Joi.string().required().custom(objectId),
	}),
});

const createCheckout = Joi.object().keys({
	body: Joi.object().keys({
		customer: Joi.string().required().custom(objectId).required(),
		checkout_items: Joi.array()
			.items(Joi.string(), Joi.object())
			.required(),
		total_quantity: Joi.number().min(1).required(),
		total_price: Joi.number().required(),
		status: Joi.string()
			.valid(
				"To Process",
				"On Its Way",
				"Delivered",
				"Cancelled",
				"Rejected"
			)
			.default("To Process")
			.required(),
	}),
});

// const updateCheckout = Joi.object().keys({
// 	params: Joi.object().keys({
// 		checkoutId: Joi.string().required().custom(objectId),
// 	}),
// 	body: Joi.object().keys({}),
// });

const updateStatusCheckout = Joi.object().keys({
	params: Joi.object().keys({
		checkoutId: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		status: Joi.string()
			.valid(
				"To Process",
				"On Its Way",
				"Delivered",
				"Cancelled",
				"Rejected"
			)
			.required(),
	}),
});

const deleteCheckout = Joi.object().keys({
	params: Joi.object().keys({
		checkoutId: Joi.string().required().custom(objectId),
	}),
});

module.exports = {
	getCheckouts,
	getCheckout,
	createCheckout,
	// updateCheckout,
	updateStatusCheckout,
	deleteCheckout,
};
