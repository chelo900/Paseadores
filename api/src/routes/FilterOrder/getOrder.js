const { Router } = require("express");
const { User } = require("../../db");

const router = Router();


router.get("/order/:attribute/:order", async (req, res) => {
  const { attribute, order } = req.params;
  try {
    if (order == "DESC") {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
        },
        order: [[attribute, "DESC"]],
      });
      res.status(200).json(allActiveWalkers);
    }
    if (order == "ASC") {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
        },
        order: [[attribute, "ASC"]],
      });
      res.status(200).json(allActiveWalkers);
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;