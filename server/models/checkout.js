const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CheckoutSchema = new Schema(
  {
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
    total_quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: mongoose.Types.Decimal128,
      get: getValue,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "To Process",
        "On Its Way",
        "Delivered",
        "Cancelled",
        "Rejected",
      ],
      default: "To Process",
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
function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}
CheckoutSchema.virtual("created_at").get(function () {
  return this.createdAt
    ? DateTime.fromJSDate(this.createdAt).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      )
    : "";
});

const CheckoutSaleSchema = new Schema(
  {
    sale_price: { type: mongoose.Types.Decimal128, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timeseries: {
      timeField: "timestamp",
    },
  }
);
const CheckoutSale = mongoose.model("sale-checkout", CheckoutSaleSchema);

CheckoutSchema.post("save", function (doc) {
  let checkout_sale = new CheckoutSale({
    sale_price: doc.total_price,
  });
  checkout_sale
    .save()
    .then((result) => {
      console.log("Create Checkout Sale Successfully", result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
