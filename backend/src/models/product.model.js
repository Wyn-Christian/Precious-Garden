const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		price: {
			type: mongoose.SchemaTypes.Decimal128,
			required: true,
			get: getValue,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			enum: ["Plant", "Pot", "Soil", "Tool"],
		},
		img_name: {
			type: String,
			trim: true,
		},
		stocks: {
			type: Number,
			required: true,
			default: 1,
		},
		num_sold: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
		id: true,
		toJSON: {
			getters: true,
		},
	}
);
function getValue(value) {
	if (typeof value !== "undefined") {
		return parseFloat(value.toString());
	}
	return value;
}

ProductSchema.virtual("img_url").get(function () {
	return `/images/products/${this.img_name}`;
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
