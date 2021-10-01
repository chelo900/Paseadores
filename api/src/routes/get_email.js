const { Router } = require('express');
const { User } = require('../db')
const bcryptjs = require('bcryptjs')

const router = Router();

router.get("/", async (req, res) => {
    const {email, password} = req.body
    

    try{  
            const UserAuth = await User.findOne({
                where: {
                    email: email
                }
            })
            let userDetail = {email : UserAuth.email, password: UserAuth.password} 

            console.log(userDetail)
             let compare = await bcryptjs.compare(userDetail.password, password)

            if(compare){
                return res.status(404).send("Compruebe sus credenciales");
            }
            if(userDetail){
              return  res.status(200).send(userDetail);
            }
        }
    catch {
        res.status(500).send("Ecurrió un error");
      }
    });

    module.exports = router;