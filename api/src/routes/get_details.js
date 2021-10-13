const { Router } = require("express");
const { User, Image } = require("../db");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const datos = await User.findOne({
      where: {
        id: id,
      },
      include: {
        model: Image,
      },
    });
    const detallesDatos = {
      id: datos.id,
      name: datos.name,
      surname: datos.surname,
      birth_day: datos.birth_day,
      image: datos.image,
      phone: datos.phone,
      email: datos.email,
      ubication: datos.ubication,
      service: datos.service,
      price: datos.price,
      description: datos.description,
      dni: datos.dni,
      morning: datos.morning,
      afternoon: datos.afternoon,
      images: datos.images,
      premium: datos.premium,
      status: datos.status,
    };

    if (detallesDatos) {
      res.status(200).send(detallesDatos);
    } else {
      res.status(404).send("No se encontró al paseador");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;
