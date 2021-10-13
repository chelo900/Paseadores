const { Router } = require("express");
const router = Router();
const { User, Client} = require('../db');


router.get('/:id', async(req, res, next) => {
    const {id} = req.params
    
   try {
       
    const client = await Client.findOne({
        where: { id: id },
        include: User,
      });
        
       return res.json(client.users)
          
    }catch(error){
        next(error)
    }
})

module.exports = router;