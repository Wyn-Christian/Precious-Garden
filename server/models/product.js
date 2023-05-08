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
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      trim: true,
    },

    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    img_name: {
      type: String,
      trim: true,
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

const PlantsProductSchema = new Schema({
  height: Number,
  pot_diameter: Number,
  type: {
    type: String,
    enum: ["indoor", "outdoor"],
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
const PlantsProduct = Product.discriminator(
  "PlantsProduct",
  PlantsProductSchema
);

module.exports = { Product, PlantsProduct };
