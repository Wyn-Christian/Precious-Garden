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
    type: {
      type: String,
      enum: ["admin", "customer"],
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);
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
