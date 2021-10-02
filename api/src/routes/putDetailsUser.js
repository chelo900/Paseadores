const { Router } = require("express");
const router = Router();
const {User} = require ('../db')

 router.put('/:id', async (req, res) => {
    const  detail = req.body;
    const {id}= req.params;
    try {
        let user = await User.update(detail, {
            where: {
                id: id
            }
        });
        return res.status(200).json({message: 'Your profile was updated'})
    } catch (err) {
        console.log(err)
    }

})
 


module.exports = router