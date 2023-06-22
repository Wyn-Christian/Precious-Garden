var express = require("express");
var router = express.Router();
const multer = require("multer");

const category_services = require("../services/category");
const product_services = require("../services/product");
const user_services = require("../services/user");
const cart_item_services = require("../services/cart-item");
const checkout_services = require("../services/checkout");

const storage = (file_dest) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${file_dest}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        uniqueSuffix +
          "-" +
          file.originalname.replace(/\s+/g, "-").toLowerCase()
      );
    },
  });

const upload_users = multer({
  storage: storage("users"),
});

const upload_product = multer({
  storage: storage("products"),
});

// Product Routes
router.post(
  "/product/create",
  upload_product.single("image"),
  product_services.create
);
router.patch(
  "/product/:id/update",
  upload_product.single("image"),
  product_services.update
);
router.post(
  "/plant-product/create",
  upload_product.single("image"),
  product_services.create_plant
);
router.patch(
  "/plant-product/:id/update",
  upload_product.single("image"),
  product_services.update_plant
);
router.delete("/product/:id/delete", product_services.delete);
router.post("/view-product", product_services.view_product);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// User Routes
router.post(
  "/user/create",
  upload_users.single("image"),
  user_services.create
);
router.patch(
  "/user/:id/update",
  upload_users.single("image"),
  user_services.update
);

// Customer Routes
router.post(
  "/customer/create",
  upload_users.single("image"),
  user_services.create_customer
);
router.patch(
  "/customer/:id/update",
  upload_users.single("image"),
  user_services.update_customer
);

router.get("/customer/:id/wishlist", user_services.wishlist_customer);
router.post("/customer/add-to-wishlist", user_services.add_to_wishlist);
router.delete(
  "/customer/remove-to-wishlist",
  user_services.remove_to_wishlist
);

router.get("/customer/:id/cart-items", cart_item_services.list_customer);
router.get("/customer/:id/checkouts", checkout_services.list_customer);

router.post("/login", user_services.login);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);
router.get("/customers", user_services.list_customers);

// Cart Items Routes
router.post("/cart-item/create", cart_item_services.create);
router.patch("/cart-item/:id/update", cart_item_services.update);
router.delete("/cart-item/:id/delete", cart_item_services.delete);
router.get("/cart-item/:id", cart_item_services.detail);
router.get("/cart-items", cart_item_services.list);

// Checkout Routes
router.post("/checkout/create", checkout_services.create);
router.patch(
  "/checkout/:id/status-change",
  checkout_services.status_change
);
// router.post("/checkout/:id/delete", checkout_servicees.delete);
router.get("/checkouts/:id", checkout_services.detail);
router.get("/checkouts", checkout_services.list);

module.exports = router;
