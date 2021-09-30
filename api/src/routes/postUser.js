const { Router } = require("express");
const router = Router();
const { User } = require("../db");

console.log("antes del post");

router.post("/", async (req, res) => {
  const { name, surname, dni, birth_day, image, phone, email, password, service } = req.body;

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
        password: password
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
