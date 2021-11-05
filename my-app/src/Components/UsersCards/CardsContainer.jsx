import Card from "../Card/Card";

function CardsContainer({ allUsers, favorites }) {
  return allUsers.content?.length > 0 ? (
    allUsers.content.map((el) => {
      let fv;

      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === el.id) {
          fv = true;
        }
      }

      return (
        <Card
          key={el.id}
          id={el.id}
          name={el.name}
          surname={el.surname}
          image={el.image}
          service={el.service}
          price={el.price}
          reputation={el.reputation}
          description={el.description}
          ubication={el.ubication}
          fv={fv}
        />
      );
    })
  ) : (
    <div>
      <p>No se encontraron usuarios</p>
    </div>
  );
}

export default CardsContainer;
