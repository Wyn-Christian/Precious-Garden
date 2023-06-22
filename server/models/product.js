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

    // category: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    //   ref: "Category",
    // },
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

const PlantsProductSchema = new Schema({
  height: Number,
  pot_diameter: Number,
  type: {
    type: String,
    enum: ["Indoor", "Outdoor"],
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
const PlantsProduct = Product.discriminator(
  "PlantsProduct",
  PlantsProductSchema
);

const ViewProductSchema = new Schema(
  {
    view: { type: Number, default: 1 },
    timestamp: { type: Date, default: Date.now },
    metadata: {
      product: String,
    },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
    },
  }
);
const ViewProduct = mongoose.model("View-Product", ViewProductSchema);

module.exports = { Product, PlantsProduct, ViewProduct };
