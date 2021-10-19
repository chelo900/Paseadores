const { Router } = require("express");
const { User } = require("../db");
const { filterAndSortWalkers } = require("../utils/filterAndSort");
const queryString = require("query-string");

const router = Router();

router.get("/", async (req, res) => {
  // const { name } = req.params;
  const { page, pageSize, inputFilters, selectFilters, sortData, name } =
    req.query;
  const parsedFilters = queryString.parse(inputFilters);
  const parsedSelectFilters = queryString.parse(selectFilters);
  const parsedSortData = queryString.parse(sortData);

  const filtersArray = parsedFilters
    ? Object.entries(parsedFilters).map((filter) => {
        return {
          [filter[0]]:
            filter[0] === "min" || filter[0] === "max"
              ? Number(filter[1])
              : filter[1],
        };
      })
    : [];

  const selectFiltersArray = Object.entries(parsedSelectFilters).map(
    (filter) => {
      return { [filter[0]]: filter[1] };
    }
  );
  parsedSortData.isSortAscending === "true"
    ? (parsedSortData.isSortAscending = true)
    : (parsedSortData.isSortAscending = false);

  const pageN = Number.parseInt(page);
  const pageL = Number.parseInt(pageSize);

  let pageDb = 0;
  if (!Number.isNaN(pageN) && pageN > 0) {
    pageDb = pageN;
  }

  let limit = 10;
  if (!Number.isNaN(pageL) && pageL > 0 && pageL < 20) {
    limit = pageL;
  }

  try {
    const allActiveWalkers = await User.findAndCountAll({
      limit: limit,
      offset: pageDb * limit,
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
        latitude: w.latitude,
        longitude : w.longitude
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
      if (sortData || filtersArray.length || selectFiltersArray.length) {
        const filteredWalkers = filterAndSortWalkers({
          walkers: allActiveWalkersCards,
          filtersArray,
          selectFiltersArray,
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
    res.json(error);
  }
});

module.exports = router;
