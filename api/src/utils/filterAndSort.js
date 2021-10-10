const isEmpty = require("lodash/isEmpty");
const isArray = require("lodash/isArray");

const FILTERS = ["ubication", "service", "name"];
const PRICE_FILTERS = ["min", "max"];

const sortNumber = (a, b) => a - b;

const sortNumberValue = (a, b) => sortNumber(a.value, b.value);

const sortWalkersBy = ({ walkers, parsedSortData }) => {
  const { sortField, isSortAscending } = parsedSortData;

  if (sortField) {
    const walkerValues = walkers.map((walker) => {
      return { id: walker.id, value: Number(walker[sortField]) };
    });

    const sortedWalkerValues = walkerValues.sort(sortNumberValue);

    if (!isSortAscending) {
      sortedWalkerValues.reverse();
    }

    const sortedWalkers = sortedWalkerValues.map((sortField) =>
      walkers.find((walker) => walker.id === sortField.id)
    );

    return sortedWalkers;
  }
  return walkers;
};

const filterWalkers = ({ walkers, filtersArray, selectFiltersArray }) => {
  let filteredWalkers = walkers;

  if (!isEmpty(selectFiltersArray) || !isEmpty(filtersArray)) {
    //FILTROS CON INPUT

    filtersArray.forEach((filter) => {
      if (filter.hasOwnProperty("min") || filter.hasOwnProperty("max")) {
        filteredWalkers = filteredWalkers.filter((walker) => {
          if (filter.min) {
            return walker.price >= [filter.min];
          }
          if (filter.max) {
            return walker.price <= [filter.max];
          }
        });
      }
      if (filter.hasOwnProperty("ubication")) {
        filteredWalkers = filteredWalkers.filter((walker) =>
          walker.ubication
            ?.toLowerCase()
            .startsWith(filter.ubication.toLowerCase())
        );
      }
    });

    //FILTROS CON SELECT
    selectFiltersArray.forEach((filter) => {
      if (filter.hasOwnProperty("service")) {
        filteredWalkers = filteredWalkers.filter(
          (walker) =>
            walker.service.toLowerCase() === filter.service.toLowerCase()
        );
      }

      //TODO FILTRAR POR HORARIO SEGUN COMO LO TRABAJEMOS
    });
  }
  return filteredWalkers;
};

const filterAndSortWalkers = ({
  walkers,
  filtersArray,
  selectFiltersArray,
  parsedSortData,
}) => {
  let filteredWalkers = filterWalkers({
    walkers,
    filtersArray,
    selectFiltersArray,
  });
  if (parsedSortData && parsedSortData.sortField) {
    filteredWalkers = sortWalkersBy({
      walkers: filteredWalkers,
      parsedSortData,
    });
  }

  return filteredWalkers;
};

module.exports = { filterAndSortWalkers };
