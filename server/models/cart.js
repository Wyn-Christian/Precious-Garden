const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema(
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
  },
  {
    timestamps: true,
    id: true,
  }
);

module.exports = mongoose.model("Cart-Item", CartItemSchema);
