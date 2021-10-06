const { Router } = require("express");
const router = Router();
const { Client } = require("../../db");
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    ubication,
    name,
    surname,
    dni,
    image,
    phone,
    email,
    password,
    description
  } = req.body;

  let passwordHash = await bcryptjs.hash(password, 8);

  try {
    const [client, created] = await Client.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        ubication: ubication,
        name: name,
        dni: dni,
        surname: surname,
        image: image,
        phone: phone,
        password: passwordHash,
        description: description
      },
    });
    if (!created) {
      return res
        .status(200)
        .json({ message: "Your email adress is already registered" });
    }

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
