const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getCheckoutItems = Joi.object().keys({
	params: Joi.object().keys({}),
	query: Joi.object().keys({}),
	body: Joi.object().keys({}),
});
