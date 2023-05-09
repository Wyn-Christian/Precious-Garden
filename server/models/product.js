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
const Product = mongoose.model("Product", ProductSchema);

const PlantsProductSchema = new Schema({
  height: Number,
  pot_diameter: Number,
  type: {
    type: String,
    enum: ["indoor", "outdoor"],
    required: true,
  },
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
      user: String,
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
