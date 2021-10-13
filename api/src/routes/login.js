const { Router } = require("express");
const { User, Client, Administrator } = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

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

    const admin = await Administrator.findOne({
      where: {
        email: email,
      },
    });

    let isValid;
    //console.log(user)
    if (user && user.status !== "removed") {
      var userData = {
        id: user.id,
        email: user.email,
        walker: true,
        admin: false,
      };
      isValid = await bcryptjs.compare(password, user.password);
    } else if (client && client.status !== "removed") {
      var userData = {
        id: client.id,
        email: client.email,
        walker: false,
        admin: false,
      };
      isValid = await bcryptjs.compare(password, client.password);
    } else if (admin) {
      var userData = {
        id: admin.id,
        email: admin.email,
        walker: false,
        admin: true,
      };
      // isValid = password === admin.password ? true : false
      isValid = await bcryptjs.compare(password, admin.password);
    }

    //console.log("aaaaaaaa"+userData)
    if (isValid) {
      const token = jwt.sign(userData, SECRET, { expiresIn: 60 * 60 * 24 });

      return res.status(200).send({
        validate: true,
        id: userData.id,
        email: userData.email,
        token,
        walker: userData.walker,
        admin: userData.admin,
      });
    } else {
      return res.status(200).json({
        validate: false,
      });
    }
  } catch {
    res.status(500).send("Ocurrió un error");
  }
});

module.exports = router;
