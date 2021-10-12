const { Router } = require("express");
const { User } = require("../../db");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

const router = Router();

router.get("/", async (req, res) => {
  const  email  = req.query.email;

  try {
    const allActiveWalkers = await User.findAll( 
      {where: {
      status: "active" || "inactive" ,
    }});
/*
    const allActiveWalkersCards = await allActiveWalkers?.map((w) => {
      return {
        id: w.id,
        email: w.email,
        name: w.name,
        surname: w.surname,
        image: w.image,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
        morning: w.morning,
        afternoon: w.afternoon
      };
    });*/
    if (allActiveWalkers.length) {
      //GET BY NAME
      if (email) {
        try {
          const nameSearch = allActiveWalkers.filter(
            (user) => user.email.includes(email)
          );
          return res.status(200).send(nameSearch);
        } catch (error) {
         return console.error(error);
        }
      }
      
      return res.status(200).json(allActiveWalkers)
      
    } else {
      return res.status(200).send(allActiveWalkers);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;




