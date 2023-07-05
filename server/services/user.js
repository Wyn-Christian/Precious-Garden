const { User, Customer, LoginCustomer } = require("../models/user");

exports.list = (req, res, next) => {
	User.find()
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};
exports.list_customers = (req, res, next) => {
	User.find({ type: "customer" })
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.detail = (req, res, next) => {
	User.findById(req.params.id)
		.populate("wishlist")
		.then((result) => res.json(result))
		.catch((error) => {
			console.log(error);
			next(error);
		});
};

exports.create = (req, res, next) => {
	const { name, email, password, type, address } = req.body;

	const user = new User({
		name,
		email,
		password,
		img_name: req.file.filename,
		position: "admin",
		address,
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
	const user = ({ name, email, password, type, address } = req.body);

	if (req.file) {
		user.img_name = req.file.filename;
	}

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
	const { name, email, password, username, address, phone } = req.body;

	const customer = new Customer({
		name,
		email,
		password,
		username,
		img_name: req.file.filename,
		position: "customer",
		address,
		phone,
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
	const customer = ({
		name,
		email,
		password,
		type,
		username,
		status,
		address,
	} = req.body);

	if (req.file) {
		customer.img_name = req.file.filename;
	}

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

exports.login = async (req, res, next) => {
	let user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});

	if (user === null) {
		return res.json({ error: "no user" });
	}

	const login = new LoginCustomer({});
	if (user.position === "customer") {
		login
			.save()
			.then((result) => console.log("Customer Login", result))
			.catch((error) => {
				console.log(error);
				next(error);
			});
	}
	return res.json(user);
};

exports.wishlist_customer = (req, res, next) => {
	Customer.findById(req.params.id)
		.then((result) => res.json(result.wishlist))
		.catch((err) => next(err));
};

exports.add_to_wishlist = (req, res, next) => {
	Customer.findByIdAndUpdate(
		req.body.customer,
		{
			$push: { wishlist: req.body.product },
		},
		{ new: true }
	)
		.then((result) => {
			console.log("Add to Wishlist Successfully!", result);
			res.json(result);
		})
		.catch((err) => next(err));
};

exports.remove_to_wishlist = (req, res, next) => {
	Customer.findByIdAndUpdate(
		req.body.customer,
		{
			$pull: { wishlist: req.body.product },
		},
		{ new: true }
	)
		.then((result) => {
			console.log("Remove to Wishlist Successfully!", result);
			res.json(result);
		})
		.catch((err) => next(err));
};
