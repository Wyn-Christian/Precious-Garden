const CartItem = require("../models/cart-item");

exports.list = (req, res, next) => {
	CartItem.find()
		.populate({
			path: "product",
			populate: { path: "category", select: "name -_id" },
		})
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.list_customer = (req, res, next) => {
	CartItem.find({ customer: req.params.id })
		.populate({
			path: "product",
			populate: {
				path: "category",
			},
		})
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.detail = (req, res, next) => {
	CartItem.findById(req.params.id)
		.populate({
			path: "product",
			populate: { path: "category", select: "name" },
		})
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.create = (req, res, next) => {
	const { customer, product } = req.body;

	const cart_item = new CartItem({
		customer,
		product,
	});

	cart_item
		.save()
		.then((result) => {
			console.log("Create Cart Item Successfully", result);
			res.json(result);
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.update = (req, res, next) => {
	const cart_item = ({ customer, product, quantity } = req.body);

	CartItem.findByIdAndUpdate(req.params.id, cart_item, { new: true })
		.then((result) => {
			console.log("Update Cart Item Successfully", result);
			res.json(result);
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.delete = (req, res, next) => {
	CartItem.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete Cart Item Successfully", result);
			res.json(result);
		})
		.catch((error) => {
			console.log(error);
			next(error);
		});
};
