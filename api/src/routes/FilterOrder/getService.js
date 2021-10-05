const { Router } = require("express");
const { User } = require("../../db");

const router = Router();

router.get("/filter/:service", async (req, res) => {
  const { service } = req.params;
  if (service == "p") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
          service : "Walker"
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  } if (service == "c") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
          service : "Carer"
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  } if (service == "pyc") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
          service : "Walker and Carer"
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  }
});

module.exports = router;