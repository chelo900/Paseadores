const { Router } = require("express");
const { User } = require("../db");

const router = Router();



router.get("/", async (req, res) => {
    
    try{
        
        const allActiveWalkers = await User.findAll({
            where: {
                status: "active"
            }
        })
        const allActiveWalkersCards = await allActiveWalkers.map(w=>{
            return {
                id: w.id,
                name: w.name,
                surname: w.surname,
                image : w.image,
                service: w.service ,
                ubication: w.ubication,
                reputation: w.reputation,
                price: w.price,
            }
        })
        if(allActiveWalkersCards){

            res.status(200).send(allActiveWalkersCards)
        }else{
        res.status(404).send("Not found");
        }
    }
    catch{
         res.status(500).send("Error");
      }
    });

    module.exports = router;