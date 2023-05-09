const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkout_items: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Checkout-Item",
      required: true,
    },
  ],
  total_quantiy: {
    type: Number,
    required: true,
  },
  total_price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
