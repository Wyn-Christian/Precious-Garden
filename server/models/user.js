const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		img_name: String,
		position: {
			type: String,
			enum: ["admin", "customer"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
UserSchema.virtual("img_url").get(function () {
	return `/images/users/${this.img_name}`;
});
const User = mongoose.model("User", UserSchema);

const CustomerSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["non-verified", "verified", "blocked"],
		default: "non-verified",
	},
	phone: { type: String, default: "n/a" },
	address: { type: String, default: "n/a" },
	wishlist: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Product",
		},
	],
});
const Customer = User.discriminator("Customer", CustomerSchema);

const LoginCustomerSchema = new Schema(
	{
		login: { type: Number, default: 1 },
		timestamp: { type: Date, default: Date.now },
	},
	{
		timeseries: {
			timeField: "timestamp",
		},
	}
);
const LoginCustomer = mongoose.model(
	"login-customer",
	LoginCustomerSchema
);

module.exports = { User, Customer, LoginCustomer };
