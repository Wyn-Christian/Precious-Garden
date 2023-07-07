const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutItemSchema = new Schema(
	{
		product: {
			type: mongoose.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		name: String,
		img_name: String,
		category: { type: String, default: "Plant" },
		quantity: {
			type: Number,
			required: true,
		},
		price: {
			type: mongoose.Types.Decimal128,
			get: getValue,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			getters: true,
		},
	}
);
CheckoutItemSchema.virtual("img_url").get(function () {
	return `/images/products/${this.img_name}`;
});
function getValue(value) {
	if (typeof value !== "undefined") {
		return parseFloat(value.toString());
	}
	return value;
}

module.exports = mongoose.model("Checkout-Item", CheckoutItemSchema);
