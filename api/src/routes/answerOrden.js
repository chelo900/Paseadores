const { Router } = require("express");
const { Orden, User ,Op } = require("../db");

const router = Router();

router.put("/", async (req, res) => {
  const answer = req.body;
  console.log(answer.id)
  try {
    const datos = await Orden.update({estadoReserva: answer.estadoReserva, color : 'green'},
    {
        where: {
            id : answer.id
        }
    })
    console.log(datos)
    if (datos) {
      res.status(200).send(datos); 
    } else {
      res.status(404).send("No se encontro la orden");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;