const Category = require("../models/category");

exports.list = (req, res, next) => {
  Category.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
};

exports.detail = (req, res, next) => {
  Category.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
};

exports.create = (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  category
    .save()
    .then((result) => {
      console.log("Create Category Successfully", result);
      res.json(result);
    })
    .catch((err) => next(err));
};

exports.update = (req, res, next) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.findByIdAndUpdate(req.params.id, category, { new: true })
    .then((result) => {
      console.log("Update Category Successfully", result);
      res.json(result);
    })
    .catch((err) => next(err));
};

exports.delete = (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Delete Category Successfully", result);
      res.json(result);
    })
    .catch((err) => next(err));
};
