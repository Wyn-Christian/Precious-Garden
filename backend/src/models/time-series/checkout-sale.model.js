const mongoose = require("mongoose");

const CheckoutSaleSchema = new mongoose.Schema(
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

module.exports = CheckoutSale;
