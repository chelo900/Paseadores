const { Router } = require("express");
const { User, Client} = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
console.log(email)
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const client = await Client.findOne({
      where: {
        email: email,
      },
    });
    
    let isValid

    if (user) {
      var userData = {
        id: user.id,
        email: user.email,
       walker: true
      }
      isValid = await bcryptjs.compare(password, user.password);

    }else if(client){
      var userData = {
        id: client.id,
        email: client.email,
        walker: false
      }
      isValid = await bcryptjs.compare(password, client.password);
    } 

      if (isValid) {
        const token = jwt.sign(userData, SECRET);

        return res.status(200).send({
          validate: true,
          id: userData.id,
          email: userData.email,
          token,
          walker:userData.walker

        });
      } else {
        return res.status(200).json({
          validate: false
        });
      }
    
  } catch {
    res.status(500).send("Ocurrió un error");
  }
});

module.exports = router;
