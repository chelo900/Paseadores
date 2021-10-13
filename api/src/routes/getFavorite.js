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



        const favourite = client.users.map((t) => {
            return t.id
          })
        return res.json(favourite)
          
    }catch(error){
        next(error)
    }
})

module.exports = router;