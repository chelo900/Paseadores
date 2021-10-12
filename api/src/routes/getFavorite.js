const { Router } = require("express");
const router = Router();
const { User, Client } = require('../db');


router.get('/:idclient', async(req, res, next) => {
    const {idclient} = req.params
    
    
    try {
        const client = await Client.findByPk(idclient, {include: User})
        return res.json(client)
    }catch(error){
        next(error)
    }
})

module.exports = router;