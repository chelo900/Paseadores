const sortNumber = (a, b) => a - b;

const sortNumberValue = (a, b) => sortNumber(a.value, b.value);

const sortWalkersBy = ({ walkers, sortData }) => {
  const { field, isSortAscending } = sortData;
  if (field) {
    const walkerValues = walkers.map((walker) => {
      return { id: walker.id, value: Number(walker[field]) };
    });

    const sortedWalkerValues = walkerValues.sort(sortNumberValue);

    const sortedValues = !isSortAscending
      ? sortedWalkerValues.reverse()
      : sortedWalkerValues;

    const sortedWalkers = sortedValues.map((field) =>
      walkers.find((walker) => walker.id === field.id)
    );

    return sortedWalkers;
  }
  return walkers;
};

const filterWalkers = (walkers, filters) => {
  let filteredWalkers = walkers;
  filters.forEach((filter) => {
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
  return filteredWalkers;
};

const filterAndSortWalkers = ({ walkers, filters, sortData }) => {
  let filteredWalkers = filterWalkers(walkers, filters);
  if (sortData.field) {
    filteredWalkers = sortWalkersBy({
      walkers: filteredWalkers,
      sortData,
    });
  }
  return filteredWalkers;
};

module.exports = { filterAndSortWalkers };
