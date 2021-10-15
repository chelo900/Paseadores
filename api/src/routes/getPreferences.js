const { Router } = require("express");
const {Preference} = require("../db");


const router = Router();



router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
//   console.log('preferences',userId)
  try {
    const preferencias = await Preference.findOne({
      where: {
            userId: userId
        }
    })
        const detalleOrden = {
      
        turno: preferencias.turno ||"Mañana",
        dias_trabajo: preferencias.dias_trabajo || "LV",       
        perros_por_paseo: preferencias.perros_por_paseo || 5,
        duracion_paseos: preferencias.duracion_paseos || '01:00',
        comienzo_jornada: preferencias.comienzo_jornada ||'07:00:00',
        fin_jornada: preferencias.fin_jornada || '20:00:00'
             
            // eventClick={handleEventClick}
    
          
        }
        // console.log(preferencias)
        if (detalleOrden) {
          res.status(200).send(detalleOrden); 
        } else {
          res.status(404).send("No se encontro la orden");
        }
      } 
      
    
   
    
    catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;