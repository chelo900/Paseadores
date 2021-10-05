const { Router } = require("express");
const { User } = require("../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.params;
  const { page } = req.query;
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        status: "active",
      },
    });
    const allActiveWalkersCards = await allActiveWalkers.map((w) => {
      return {
        id: w.id,
        email:w.email,
        name: w.name,
        surname: w.surname,
        image: w.image,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
        morning: w.morning,
        afternoon: w.afternoon
      };
    });
    if (allActiveWalkersCards) {
      //GET BY NAME
      if (name) {
        try {
          const nameSearch = allActiveWalkersCards.filter(
            (user) => user.name.includes(name) || user.surname.includes(name)
          );
          res.status(200).send(nameSearch);
        } catch (error) {
          console.error(error);
        }
      }
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

module.exports = router;

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

// router.get("/filter/:Horarios", async (req, res) => {
//   const { Horarios } = req.params;
//   if (Horarios = "m") {
//     try {
//       const allActiveWalkers = await User.findAll({
//         where: {
//           morning : "active",
//           status: "active"
//         },
//       });
//       return res.status(200).json(allActiveWalkers);
//     } catch (err) {
//       res.json({ error: err });
//     }
//   } if (Horarios = "a") {
//     try {
//       const allActiveWalkers = await User.findAll({
//         where: {
//           afternoon : "active",
//           status: "active"
//         },
//       });
//       return res.status(200).json(allActiveWalkers);
//     } catch (err) {
//       res.json({ error: err });
//     }
//   } if (Horarios = "t") {
//     try {
//       const allActiveWalkers = await User.findAll({
//         where: {
//           status: "active",
//         },
//       });
//       return res.status(200).json(allActiveWalkers);
//     } catch (err) {
//       res.json({ error: err });
//     }
//   }
// });

router.get("/filter/:ubication", async (req, res) => {
  const { ubication } = req.params;
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        ubication,
      },
    });
    return res.status(200).json(allActiveWalkers);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/filter/:service", async (req, res) => {
  const { service } = req.params;
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        service,
      },
    });
    return res.status(200).json(allActiveWalkers);
  } catch (err) {
    res.json({ error: err });
  }
});
