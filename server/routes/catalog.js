var express = require("express");
var router = express.Router();

const category_services = require("../services/category");
const product_services = require("../services/product");

router.post("/category/create", category_services.create);
router.post("/category/:id/update", category_services.update);
router.get("/category/:id", category_services.detail);
router.get("/categories", category_services.list);

router.post("/product/create", product_services.create);
router.post("/product/:id/update", product_services.update);
router.post("/plant-product/create", product_services.plant_create);
router.post("/plant-product/:id/update", product_services.plant_update);
router.post("/view-product", product_services.view_product);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

module.exports = router;
