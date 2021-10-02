const { Router } = require("express");
const { Horarios } = require("../db");

const router = Router();

router.put("/:day", async (req, res) => {
    const {day} = req.params
    const { morning_hours, afternoom_hours } = req.body
    
    try{  
        const paseador = await Horarios.findOne({
            where: {
                day: day
            }
        })
        morning_hours && (paseador.morning_hours = morning_hours)
        afternoom_hours && (paseador.afternoom_hours = afternoom_hours)
        

        const paseadorActualizado = await paseador.save()

        res.status(200).send(paseadorActualizado);
    }catch{
        res.status(500).send("Ecurrió un error");
    }
});

module.exports = router;