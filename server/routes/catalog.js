var express = require("express");
var router = express.Router();

const category_services = require("../services/category");
const product_services = require("../services/product");
const user_services = require("../services/user");
const cart_item_services = require("../services/cart-item");
const checkout_servicees = require("../services/checkout");

// Category Routes
router.post("/category/create", category_services.create);
router.post("/category/:id/update", category_services.update);
router.post("/category/:id/delete", category_services.delete);
router.get("/category/:id", category_services.detail);
router.get("/categories", category_services.list);

// Product Routes
router.post("/product/create", product_services.create);
router.post("/product/:id/update", product_services.update);
router.post("/plant-product/create", product_services.create_plant);
router.post("/plant-product/:id/update", product_services.update_plant);
router.post("/view-product", product_services.view_product);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// User Routes
router.post("/user/create", user_services.create);
router.post("/user/:id/update", user_services.update);

// Customer Routes
router.post("/customer/create", user_services.create_customer);
router.post("/customer/create", user_services.create_customer);
router.post("/customer/:id/update", user_services.update_customer);

router.get("/customer/:id/cart-items", cart_item_services.list_customer);
router.get("/customer/:id/checkouts", checkout_servicees.list_customer);

router.post("/login-customer", user_services.login_customer);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);

// Cart Items Routes
router.post("/cart-item/create", cart_item_services.create);
router.post("/cart-item/:id/update", cart_item_services.update);
router.post("/cart-item/:id/delete", cart_item_services.delete);
router.get("/cart-item/:id", cart_item_services.detail);
router.get("/cart-items", cart_item_services.list);

// Checkout Routes
router.post("/checkout/create", checkout_servicees.create);
// router.post("/checkout/:id/update", checkout_servicees.update);
// router.post("/checkout/:id/delete", checkout_servicees.delete);
router.get("/checkouts/:id", checkout_servicees.list_customer);
router.get("/checkouts", checkout_servicees.list);

module.exports = router;
