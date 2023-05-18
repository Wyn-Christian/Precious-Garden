const {
  Product,
  PlantsProduct,
  ViewProduct,
} = require("../models/product");

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
      console.log("Create Product Successfully", result);
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
      console.log("Update Product Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create_plant = (req, res, next) => {
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

  plant_product
    .save()
    .then((result) => {
      console.log("Create Plant Product Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.update_plant = (req, res, next) => {
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
      console.log("Update Product Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.view_product = (req, res, next) => {
  let view = new ViewProduct({
    metadata: {
      product: req.body.product,
    },
  });

  view
    .save()
    .then((result) => console.log("View Product", result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
