const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
<<<<<<< HEAD
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
=======

    try{
        
        const allActiveWalkers = await User.findAll({
            where: {
                status: "active"
            }
        })
        const allActiveWalkersCards = await allActiveWalkers.map(w=>{
            return {
                id: w.id,
                name: w.name,
                surname: w.surname,
                image : w.image,
                service: w.service ,
                ubication: w.ubication,
                reputation: w.reputation,
                price: w.price,
            }
        })
        if(allActiveWalkersCards){

            res.status(200).send(allActiveWalkersCards)
        }else{
        res.status(404).send("Not found");
>>>>>>> d1101c4 (infinite scroll)
        }
      }
      // PAGINATION
      const results = 5;
      const lastElement = Number(page) * Number(results);
      const firstElement = (Number(page) - 1) * Number(results);

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
