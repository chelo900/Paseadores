const { Router } = require("express");
const router = Router();
const { User } = require("../db");
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    name,
    surname,
    dni,
    birth_day,
    image,
    phone,
    email,
    password,
    service,
    front_dni,
    back_dni
  } = req.body;

  let passwordHash = await bcryptjs.hash(password, 8);

  console.log("dentro del post");

  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        name: name,
        dni: dni,
        surname: surname,
        birth_day: birth_day,
        image: image,
        phone: phone,
        service: service,
        password: passwordHash,
        front_dni: front_dni,
        back_dni: back_dni
      },
    });
    if (!created) {
      return res
        .status(200)
        .json({ message: "Your email adress is already registered" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
