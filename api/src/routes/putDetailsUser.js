const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const router = Router();
const { User } = require("../db");

const updateUser = async (req, res) => {
  try{
  const detail = req.body;
  const { id } = req.params;

  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, SECRET);

    try {
      if (!token || !decodedToken.id) {
        return res.status(401).json({ error: "Token no existente o invalido" });
      }

      await User.update(detail, {
        where: {
          id,
        },
      });
      return res.status(200).json({ message: "Tus datos fueron actualizados correctamente" });
    } catch (err) {
      console.error(err);
    }
  }
  }catch(error){
  res
    .status(401)
    .json({ error: `No tienes los privilegios para realizar esta acción ${error}` });};
  }



 
router.put('/:id',updateUser)

module.exports = router
