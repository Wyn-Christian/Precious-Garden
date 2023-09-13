const moment = require("moment");
const config = require("../../src/config/config");
const { tokenTypes } = require("../../src/config/tokens");
const tokenService = require("../../src/services/token.service");
const { userOne, admin } = require("./user.fixture");

const access_token_expires = moment().add(
	config.jwt.accessExpirationMinutes,
	"minutes"
);

const user_one_access_token = tokenService.generateToken(
	userOne._id,
	access_token_expires,
	tokenTypes.ACCESS
);

const admin_access_token = tokenService.generateToken(
	admin._id,
	access_token_expires,
	tokenTypes.ACCESS
);

module.exports = {
	user_one_access_token,
	admin_access_token,
};
