const mongoose = require("mongoose");
const Product = require("../product.model");

const PlantProductSchema = new mongoose.Schema({
	height: Number,
	pot_diameter: Number,
	type: {
		type: String,
		enum: ["Indoor", "Outdoor", "Indoor and Outdoor"],
		required: true,
	},
	add_ons: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Product",
		},
	],
	light_requirements: Number,
	humidity_needs: Number,
	watering_needs: Number,
	repotting: Number,
	pet_friendly: Number,
});
const PlantProduct = Product.discriminator(
	"PlantsProduct",
	PlantProductSchema
);

module.exports = PlantProduct;
