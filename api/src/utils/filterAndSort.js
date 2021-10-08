const isEmpty = require("lodash/isEmpty");
const isArray = require("lodash/isArray");

const sortNumber = (a, b) => a - b;

const sortNumberValue = (a, b) => sortNumber(a.value, b.value);

const sortWalkersBy = ({ walkers, parsedSortData }) => {
  const { sortField, isSortAscending } = parsedSortData;
  if (sortField) {
    const walkerValues = walkers.map((walker) => {
      return { id: walker.id, value: Number(walker[sortField]) };
    });

    const sortedWalkerValues = walkerValues.sort(sortNumberValue);

    const sortedValues = isSortAscending
      ? sortedWalkerValues.reverse()
      : sortedWalkerValues;

    const sortedWalkers = sortedValues.map((sortField) =>
      walkers.find((walker) => walker.id === sortField.id)
    );

    return sortedWalkers;
  }
  return walkers;
};

const filterWalkers = (walkers, parsedFilters) => {
  let filteredWalkers = walkers;

  if (isArray(parsedFilters) && isEmpty(parsedFilters)) {
    parsedFilters.forEach((filter) => {
      if (filter.value) {
        if (filter.field === "service") {
          filteredWalkers = filteredWalkers.filter(
            (walker) => walker.service === filter.value
          );
        }
        //TODO FILTRAR POR UBICACION SEGUN COMO LO TRABAJEMOS
        //TODO FILTRAR POR HORARIO SEGUN COMO LO TRABAJEMOS
        if (filter.field === "price") {
          filteredWalkers = filteredWalkers.filter((walker) => {
            const [minPrice, maxPrice] = filter.value;
            if (minPrice) {
              return walker.price >= minPrice;
            }
            if (maxPrice) {
              return walker.price <= minPrice;
            }
          });
        }
      }
    });
  }
  return filteredWalkers;
};

const filterAndSortWalkers = ({ walkers, parsedFilters, parsedSortData }) => {
  let filteredWalkers = filterWalkers(walkers, parsedFilters);
  if (parsedSortData && parsedSortData.sortField) {
    filteredWalkers = sortWalkersBy({
      walkers: filteredWalkers,
      parsedSortData,
    });
  }
  return filteredWalkers;
};

module.exports = { filterAndSortWalkers };
