const { Router } = require("express");
const {Orden} = require("../db");
const {Op} = require ("sequelize")

const router = Router();



router.get("/:user", async (req, res) => {
  const { user } = req.params;
  console.log(user)
  try {
    const datos = await Orden.findAll({
      where: {
        userId: user
      },
      
    });
    const detalleOrden = datos.map(ord=>{
      return{
        title: ord.ubicacion,
        start: ord.fechaInicio,
        end: ord.fechaFinal,
        color: ord.color,
        textColor: 'black',
        estadoReserva: ord.estadoReserva, 
        clientId : ord.clientId,
        ubicacion: ord.ubicacion,
        idOrden: ord.id
         
        // eventClick={handleEventClick}

      }
    })
    console.log(detalleOrden)
    if (detalleOrden) {
      res.status(200).send(detalleOrden); 
    } else {
      res.status(404).send("No se encontro la orden");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;
