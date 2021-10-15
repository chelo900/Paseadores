const { Router } = require("express");
const router = Router();
const { favourite } = require('../db');

router.put('/',async(req, res, next) => {
    const { idUser,idClient } = req.body
    try{
        // const user = User.findByPk(iduser)
        // await user.remove Product(idProduct)
        await favourite.destroy({where: {
            clientId: idClient,
            userId: idUser
        }})
        return res.send('User removed successfully');
    } catch(error){
        next(error)
    }
})
module.exports = router;