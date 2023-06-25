const {
  Product,
  PlantsProduct,
  ViewProduct,
} = require("../models/product");

exports.list = (req, res, next) => {
  Product.find()
    .populate("category")
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("category")
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create = (req, res, next) => {
  const data = { ...req.body };
  if (req.file) {
    data.img_name = req.file.filename;
  }

  const product = new Product(data);

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
  const data = { ...req.body };
  if (req.file) {
    data.img_name = req.file.filename;
  }

  Product.findByIdAndUpdate(req.params.id, data, { new: true })
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
  const data = { ...req.body };
  if (req.file) {
    data.img_name = req.file.filename;
  }

  const plant_product = new PlantsProduct(data);

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
  const data = { ...req.body };
  if (req.file) {
    data.img_name = req.file.filename;
  }

  PlantsProduct.findByIdAndUpdate(req.params.id, data, { new: true })
    .then((result) => {
      console.log("Update Plant Product Successfully", result);
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
    .then((result) => {
      console.log("View Product", result);
      res.json({ view_status: "success" });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Delete Product Successfully!", result);
      res.json({ status: "success", result });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
