const { Router } = require('express');
const { User } = require('../db')
const bcryptjs = require ('bcryptjs')

const router = Router();

router.put("/", async (req, res) => {
    const {email, password} = req.body;
    
   try{  
        
           const datos = await User.findOne({
                where: {
                    email: email
                }
            })

            if(datos){
            const detallesDatos = {email : datos.email, password: datos.password, id: datos.id} 

            let compare = await bcryptjs.compare(password, detallesDatos.password )

            console.log(password, detallesDatos)
            
            if(compare){

                return res.status(200).json({validate: true, id: detallesDatos.id});
            }else{
               return res.status(404).send(false);
            }
        }return res.status(404).send(false);
        }
    catch {
        res.status(500).send("Ocurrió un error");
      }
    });

    module.exports = router