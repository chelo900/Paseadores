const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  // console.log("middleware: ", token);
  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, SECRET);
  } catch (error) {
    console.log(error.message);
    return response.status(401).json(error);
  }

  // if (isNull(token) || !decodedToken.id) {
  //   console.log("entro al error");
  //   return response.status(401).json({ error: "Token inexistente o invalido" });
  // }
  // const { id: userId } = decodedToken;
  // request.userId = userId;

  next();
};
