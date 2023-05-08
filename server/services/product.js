const { PlantsProduct, Product } = require("../models/product");

exports.list = (req, res, next) => {
  Product.find()
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create = (req, res, next) => {
  const { name, description, price, category, img_name } = req.body;
  const product = new Product({
    name,
    description,
    price,
    category,
    img_name,
  });

  product
    .save()
    .then((result) => {
      console.log("Product Create Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.update = (req, res, next) => {
  const product = ({ name, description, price, category, img_name } =
    req.body);
  Product.findByIdAndUpdate(req.params.id, product, { new: true })
    .then((result) => {
      console.log("Product Update Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.plant_create = (req, res, next) => {
  const {
    name,
    description,
    price,
    category,
    img_name,
    height,
    pot_diameter,
    type,
  } = req.body;
  console.log("test-test", req.body);

  const plant_product = new PlantsProduct({
    name,
    description,
    price,
    category,
    img_name,
    height,
    pot_diameter,
    type,
  });
  console.log("plant_prodcut", plant_product);

  plant_product
    .save()
    .then((result) => {
      console.log("Product Create Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.plant_update = (req, res, next) => {
  const product = ({
    name,
    description,
    price,
    category,
    img_name,
    height,
    pot_diameter,
    type,
  } = req.body);

  PlantsProduct.findByIdAndUpdate(req.params.id, product, { new: true })
    .then((result) => {
      console.log("Product Update Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
