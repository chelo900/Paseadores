const { Router } = require("express");
const router = Router();
const { User } = require("../db");

router.post("/", async (req, res) => {
  const { name, surname, image, dni, phone, email, password, birthdate } =
    req.body;

  const newUser = {
    name,
    surname,
    image,
    dni,
    birthdate,
    password,
    phone,
    email,
  };
  console.log(typeof newUser.dni);
  res.status(201).json(newUser);
});

module.exports = router;
