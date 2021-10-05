const { Router } = require("express");
const { User } = require("../../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/filter/price", async (req, res) => {
  const { max, min } = req.body;
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        price : {
          [Op.and]: 
          [ 
            {[Op.gte]: min},
            {[Op.lte]: max} 
          ], 
        }
      },
    });
    return res.status(200).json(allActiveWalkers);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;