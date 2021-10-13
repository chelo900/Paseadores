const { Router } = require("express");
const router = Router();
const { User, Client } = require('../db');


router.post('/',async (req, res, next) =>{
    const { idUser,idClient } = req.body
   
    try {        
        const clientE = await Client.findByPk(idClient)
        await clientE.addUser(idUser)
        
        const fav = await Client.findOne({
            where: {
                id: idClient
            },
            include: User
        })        
        return res.status(200).json(fav)
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

