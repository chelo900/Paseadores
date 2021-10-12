const { Router } = require("express");
const router = Router();
const { User, Client } = require('../db');


router.post('/:idclient',async (req, res, next) =>{
    const { iduser } = req.body
    const {idclient} = req.params
   
    try {        
        const clientE = await Client.findByPk(idclient)
        await clientE.addUser(iduser)
        
        const fav = await Client.findOne({
            where: {
                id: idclient
            },
            include: User
        })        
        return res.status(200).json(fav)
    } catch (error) {
        return next(error)
    }
})

module.exports = router;

