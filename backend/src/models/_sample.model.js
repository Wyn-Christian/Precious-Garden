const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

const sampleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	sample: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Sample",
	},
	type: {
		type: String,
		enum: ["development", "test", "production"],
		required: true,
	},
	isValid: {
		type: Boolean,
		default: false,
	},
	when: {
		type: Date,
		required: true,
	},
	secret_key: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		validate(value) {
			if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
				throw new Error(
					"Secret key must contain at least one letter and one number"
				);
			}
		},
		private: true, // used by the toJSON plugin
	},
});

// add plugin that converts mongoose to json
sampleSchema.plugin(toJSON);
sampleSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The sample's name
 * @param {ObjectId} [excludeSampleId] - The id of the sample to be excluded
 * @returns {Promise<boolean>}
 */
sampleSchema.statics.isNameTaken = async function (name, excludeSampleId) {
	const sample = await this.findOne({
		name,
		_id: { $ne: excludeSampleId },
	});
	return !!sample;
};

/**
 * Check if secret_key matches the sample's secret_key
 * @param {string} secret_key
 * @returns {Promise<boolean>}
 */
sampleSchema.methods.isSecretKeyMatch = async function (secret_key) {
	const sample = this;
	return bcrypt.compare(secret_key, sample.secret_key);
};

sampleSchema.pre("save", async function (next) {
	const sample = this;
	if (sample.isModified("secret_key")) {
		sample.secret_key = await bcrypt.hash(sample.secret_key, 8);
	}
	next();
});

/**
 * @typedef Sample
 */
const Sample = mongoose.model("Sample", sampleSchema);

module.exports = Sample;
