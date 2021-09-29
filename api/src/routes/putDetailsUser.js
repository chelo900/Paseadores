const { Router } = require("express");
const router = Router();
const {User} = require ('../db')

const updateUser =  async (req,res)=>{
    const  detail = req.body;
    const {id}= req.params;
    try {
        let user = await User.update(detail, {
            where: {
                id
            }
        });
        return res.status(200).json({message: 'Your profile was updated'})
    } catch (err) {
        console.log(err)
    }

}

router.put('/:id',updateUser)

module.exports = router