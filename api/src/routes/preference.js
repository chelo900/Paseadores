const { Router } = require("express");
const { Preference } = require("../db");

const router = Router();


router.post("/",  async (req,res)=>{
    // const {userId, clientId} = req.params;

    const {dias_trabajo,perros_por_paseo,duracion_paseos, comienzo_jornada,fin_jornada,userId} = req.body;
    console.log(userId)
    try {
    const orden = await Preference.create({
        
        dias_trabajo,
        perros_por_paseo,
        duracion_paseos,
        comienzo_jornada,
        fin_jornada,
        userId
        
    })
    res.status(200).send('preferencia enviada')
    } catch (error) {
        console.log(error)
    }
   
})

router.put("/updatePreferencias/:userId", async(req,res)=>{
    const preference = req.body
    const {userId} = req.params
    console.log('puuuuuut',preference.userId)
    try{
        await Preference.update(preference,{
            where: {
                userId : userId
            }
        });
        res.status(200).send('Datos acualizados')
    } catch(error){
        console.log(error)
    }
})

module.exports= router
