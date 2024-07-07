const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret,
	algorithms: ['HS256'] // Or any other algorithm used for signing your JWTs
});

module.exports = authenticate;