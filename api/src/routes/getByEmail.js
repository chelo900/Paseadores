const { Router } = require("express");
const { User } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const router = Router();

router.put("/", async (req, res) => {
    const {email, password} = req.body;
    
   try{  
        
           const datos = await User.findOne({
                where: {
                    email: email
                }
            })

    if (user) {
      const userData = {
        id: user.id,
        email: user.email,
      };

      let isValid = await bcryptjs.compare(password, user.password);

      if (isValid) {
        const token = jwt.sign(userData, SECRET);

        return res.status(200).send({
          validate: true,
          id: userData.id,
          email: userData.email,
          token,
        });
      } else {
        return res.status(401).json({ error: "E-mail o contraseña inválido" });
      }
    }
    return res.status(401).json({ error: "E-mail o contraseña inválido" });
  } catch {
    res.status(500).send("Ocurrió un error");
  }
});

module.exports = router;
