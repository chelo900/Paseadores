const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { page, name } = req.query;
  try {
    const allActiveWalkers = await User.findAll({
      where: {
        status: "active",
      },
    });
    console.log(allActiveWalkers);
    const allActiveWalkersCards = await allActiveWalkers.map((w) => {
      return {
        id: w.id,
        name: w.name,
        surname: w.surname,
        image: w.image,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
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

router.get("/order/:attribute/:order", async (req, res) =>{
  const { attribute, order } = req.params;
  try {
    if ( order == "DESC") {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
        },
        order: [[ attribute, "DESC"]],
      });
      res.status(200).json(allActiveWalkers);
    }
    if ( order == "ASC") {
      const allActiveWalkers = await User.findAll({
        where: {
          status: "active",
        },
        order: [[ attribute, "ASC"]],
        
      });
      res.status(200).json(allActiveWalkers);
    }
    } catch (err) {
        res.json({ error: err });
  } 
})

router.get("/filter/:price", async (req, res) => {
  const { price } = req.params;
  try {
    const allActiveWalkers = await User.findAll({
        where: {
          price,
        },
      });
      return res.status(200).json(allActiveWalkers);
    
  } catch (err) {
    res.json({ error: err });
  } 
});

router.get("/filter/:schedule", async (req, res) => {
  const { schedule } = req.params;
  try {
    const allActiveWalkers = await User.findAll({
        where: {
          schedule,
        },
      });
      return res.status(200).json(allActiveWalkers);
    
  } catch (err) {
    res.json({ error: err });
  } 
});

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