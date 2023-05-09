const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutItemSchema = new Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
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

module.exports = mongoose.model("Checkout-Item", CheckoutItemSchema);
