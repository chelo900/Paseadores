const { Router } = require("express");
const { Horarios, User } = require("../../db");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;
  try {
    const allActiveWalkers = await Horarios.findAll({
      where: {
        status: "active",
        id : id
      },
    });
    const allActiveWalkersCards = await allActiveWalkers.map((w) => {
      return {
        id: w.id,
        day: w.day,
        morning_hours: w.morning_hours,
        afternoom_hours: w.afternoom_hours
      };
    });
    if (allActiveWalkersCards) {
      // PAGINATION
      const results = 5;
      const lastElement = Number(page) * results;
      const firstElement = (Number(page) - 1) * results;

      const paginated = allActiveWalkersCards.slice(firstElement, lastElement);
      res.status(200).send(paginated);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
  }
});


router.get("/filter/:Horarios", async (req, res) => {
  const { Horarios } = req.params;
  if (Horarios == "m") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          morning : "active",
          status: "active"
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  } if (Horarios == "a") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          afternoon : "active",
          status: "active"
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  } if (Horarios == "t") {
    try {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
        },
      });
      return res.status(200).json(allActiveWalkers);
    } catch (err) {
      res.json({ error: err });
    }
  }
});

module.exports = router;