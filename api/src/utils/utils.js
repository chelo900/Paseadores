const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const getTokenValidation = (authorization) => {
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET);
    return { isValid: true, token, decodedToken };
  }
  return { isValid: false };
};

module.exports = {
  getTokenValidation,
};
