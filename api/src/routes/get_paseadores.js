const { Router } = require("express");
const { User } = require("../db");
const { Op } = require("sequelize");
const { filterAndSortWalkers } = require("../utils/filterAndSort");
const queryString = require("query-string");

const router = Router();

router.get("/", async (req, res) => {
  const { name, ubication } = req.params;
  const { currentPage, limitPerPage, filters, sortData } = req.query;
  const parsedFilters = queryString.parse(filters);
  const parsedSortData = queryString.parse(sortData);

  console.log("filters: ", filters, "sortData: ", sortData);

  const pageN = Number.parseInt(currentPage);
  const pageL = Number.parseInt(limitPerPage);

  let page = 0;
  if (!Number.isNaN(pageN) && pageN > 0) {
    page = pageN;
  }

  let limit = 10;
  if (!Number.isNaN(pageL) && pageL > 0 && pageL < 20) {
    limit = pageL;
  }

  try {
    const allActiveWalkers = await User.findAndCountAll({
      limit: limit,
      offset: page * limit,
      where: {
        status: "active",
      },
    });
    const allActiveWalkersCards = await allActiveWalkers.rows.map((w) => {
      return {
        id: w.id,
        email: w.email,
        name: w.name,
        surname: w.surname,
        image: w.image,
        service: w.service,
        ubication: w.ubication,
        reputation: w.reputation,
        price: w.price,
        morning: w.morning,
        afternoon: w.afternoon,
        premium: w.premium,
      };
    });
    if (allActiveWalkersCards) {
      //GET BY NAME
      if (name) {
        try {
          const nameSearch = allActiveWalkersCards.filter(
            (user) =>
              user.name.toLowerCase().startsWith(name.toLowerCase()) ||
              user.surname.toLowerCase().startsWith(name.toLowerCase())
          );
          res.status(200).send(nameSearch);
        } catch (error) {
          console.error(error);
        }
      }
      if (sortData) {
        const filteredWalkers = filterAndSortWalkers({
          walkers: allActiveWalkersCards,
          parsedFilters,
          parsedSortData,
        });
        res.json({
          content: filteredWalkers,
          totalPages: Math.ceil(filteredWalkers.length / limit),
        });
      } else {
        res.json({
          content: allActiveWalkersCards,
          totalPages: Math.ceil(allActiveWalkersCards.length / limit),
        });
      }
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
