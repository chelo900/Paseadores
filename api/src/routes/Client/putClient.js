const { Router } = require("express");
const { Client } = require("../../db");
const { getTokenValidation } = require("../../utils/utils");

const router = Router();

router.put("/:id", async (req, res) => {
    try {
      const detail = req.body;
      const { id } = req.params;
  
      const authorization = req.get("authorization");
      const tokenValidation = getTokenValidation(authorization);
  
      console.log(tokenValidation);
  
      if (tokenValidation.isValid) {
        const { token, decodedToken } = tokenValidation;
  
        try {
          if (!token || !decodedToken.id) {
            return res
              .status(401)
              .json({ error: "Token no existente o invalido" });
          }
  
          await Client.update(detail, {
            where: {
              id,
            },
          });
          return res
            .status(200)
            .json({ message: "Tus datos fueron actualizados correctamente" });
        } catch (error) {
          console.error(error);
        }
      }
      } catch (error) {
          res.status(401).json({
          error: `No tienes los privilegios para realizar esta acción ${error}`,
        });
    }
})

module.exports = router;