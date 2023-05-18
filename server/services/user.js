const { User, Customer, LoginCustomer } = require("../models/user");

exports.list = (req, res, next) => {
  User.find()
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create = (req, res, next) => {
  const { name, email, password, type } = req.body;

  const user = new User({
    name,
    email,
    password,
    type,
  });

  user
    .save()
    .then((result) => {
      console.log("Create User Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.update = (req, res, next) => {
  const user = ({ name, email, password, type } = req.body);

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then((result) => {
      console.log("Update User Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log("Delete User Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.create_customer = (req, res, next) => {
  const { name, email, password, type, username } = req.body;

  const customer = new Customer({
    name,
    email,
    password,
    type,
    username,
  });

  customer
    .save()
    .then((result) => {
      console.log("Create Customer Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.update_customer = (req, res, next) => {
  const customer = ({ name, email, password, type, username, status } =
    req.body);

  Customer.findByIdAndUpdate(req.params.id, customer, { new: true })
    .then((result) => {
      console.log("Update Customer Successfully", result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.login_customer = (req, res, next) => {
  const login = new LoginCustomer({});

  login
    .save()
    .then((result) => console.log("Customer Login", result))
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
