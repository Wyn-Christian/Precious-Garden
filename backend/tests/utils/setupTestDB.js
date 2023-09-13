const mongoose = require("mongoose");
const config = require("../../src/config/config");

const setupTestDb = () => {
	beforeAll(async () => {
		await mongoose.connect(config.mongoose.url, config.mongoose.options);
	});

	beforeEach(async () => {
		await Promise.all(
			Object.values(mongoose.connection.collections).map(
				async (collections) => await collections.deleteMany()
			)
		);
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});
};

module.exports = setupTestDb;
