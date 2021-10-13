const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  const decodedToken = jwt.verify(token, SECRET);

  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: "Token no existente o invalido" });
  }
  const { id: userId } = decodedToken;
  request.userId = userId;
  next();
};
