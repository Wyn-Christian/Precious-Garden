const CartItem = require("../models/cart-item");
const Checkout = require("../models/checkout");
const CheckoutItem = require("../models/checkout-item");

exports.list = (req, res, next) => {
  Checkout.find()
    .populate({
      path: "checkout_items",
      populate: {
        path: "product",
        populate: { path: "category", select: "name _id" },
        select: "name price category -_id",
      },
    })
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.list_customer = (req, res, next) => {
  Checkout.find({ customer: req.params.id })
    .populate({
      path: "checkout_items",
      populate: {
        path: "product",
        populate: { path: "category", select: "name _id" },
        select: "name price category -_id",
      },
    })
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create = (req, res, next) => {
  const checkout = new Checkout({
    customer: req.body.customer,
    checkout_items: req.body.checkout_items,
    total_quantiy: req.body.total_quantiy,
    total_price: req.body.total_price,
  });

  checkout
    .save()
    .then(async (result) => {
      let checkout_result = await CheckoutItem.insertMany(
        req.body.checkout_items
      );
      console.log(
        `${checkout_result.length} checkout items documents were inserted`
      );
      // let cart_delete_result = await CartItem.deleteMany({
      //   customer: req.body.customer,
      // });
      // console.log(`Deleted ${cart_delete_result.deletedCount} documents`);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
