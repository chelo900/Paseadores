const { Router } = require('express');
const { User } = require('../db')

const router = Router();

router.get("/", async (req, res) => {
    const {email, password} = req.body

    try{  
            const datos = await User.findOne({
                where: {
                    email: email
                }
            })
            const detallesDatos = {email : datos.email, password: datos.password} 
            
            if(detallesDatos){

                res.status(200).send(detallesDatos);
            }else{
                res.status(404).send("email no registrado");
            }
        }
    catch {
        res.status(500).send("Ecurrió un error");
      }
    });

    module.exports = router;