const { Router } = require("express");
const { Orden } = require("../db");

const router = Router();


router.post("/",  async (req,res)=>{
    // const {userId, clientId} = req.params;
    const {fechaInicio,fechaFinal,userId, clientId,ubicacion} = req.body;
    try {
    const orden = await Orden.create({
        userId: userId,
        clientId: clientId,
        fechaInicio,
        fechaFinal,
        ubicacion
        
    })
    res.status(200).send('orden enviada')
    } catch (error) {
        console.log(error)
    }
   
})

module.exports= router

