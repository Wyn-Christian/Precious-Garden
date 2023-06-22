const CartItem = require("../models/cart-item");
const Checkout = require("../models/checkout");
const CheckoutItem = require("../models/checkout-item");
const { Product } = require("../models/product");

exports.list = (req, res, next) => {
  Checkout.find()
    .sort({ createdAt: -1 })
    .populate("customer")
    .populate({
      path: "checkout_items",
      populate: {
        path: "product",
        populate: { path: "category", select: "name _id" },
        select: "name price category ",
      },
    })
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
exports.detail = (req, res, next) => {
  Checkout.findById(req.params.id)
    .populate("customer")
    .populate({
      path: "checkout_items",
      populate: {
        path: "product",
        populate: { path: "category", select: "name _id" },
        select: "name price category ",
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
    .sort({ createdAt: -1 })
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
    total_quantity: req.body.total_quantity,
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
      let cart_delete_result = await CartItem.deleteMany({
        customer: req.body.customer,
      });
      console.log(`Deleted ${cart_delete_result.deletedCount} documents`);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
exports.status_change = (req, res, next) => {
  Checkout.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
    .populate("checkout_items")
    .then((result) => {
      if (req.body.status === "Delivered") {
        // update the stocks and num_sold of the product
        result.checkout_items.forEach((item) => {
          Product.findByIdAndUpdate(
            item.product,
            {
              $inc: {
                num_sold: item.quantity,
                stocks: -item.quantity,
              },
            },
            { new: true }
          ).then((result) =>
            console.log(
              `Product ${result.name} stock and num_sold updated`
            )
          );
        });
      }
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
