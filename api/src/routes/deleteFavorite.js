const { Router } = require("express");
const router = Router();
const { favourites } = require('../db');

router.delete('/:iduser',async(req, res, next) => {
    const {iduser} = req.body
    const {idclient} = req.params
    
    try{
        // const user = User.findByPk(iduser)
        // await user.remove Product(idProduct)
        await favourites.destroy({where: {
            Clientid: idclient,
            UserId: iduser
        }})
        return res.send('User removed successfully');
    } catch(error){
        next(error)
    }
})
module.exports = router;