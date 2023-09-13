const mongoose = require("mongoose");

const ViewProductSchema = mongoose.Schema(
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

module.exports = ViewProduct;
