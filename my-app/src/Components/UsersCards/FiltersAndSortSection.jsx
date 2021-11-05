import style from "../UsersCards/UsersCards.module.css";
import { Link } from "react-router-dom";

function FiltersAndSortSection({
  sortData,
  handleSort,
  inputFilters,
  handleFiltersSubmit,
  handleFiltersOnChange,
  ubica,
  selectFilters,
  handleSelectFilters,
  handleOnClick,
}) {
  return (
    <div>
      <div>
        <select
          name="reputation"
          className={style.rep}
          onChange={handleSort}
          value={sortData.sortField}
        >
          <option value="order"> Ordenar por Reputacion </option>
          <option value="DESC"> Mayor reputacion </option>
          <option value="ASC"> Menor reputacion </option>
        </select>
      </div>
      <div>
        <select
          name="price"
          className={style.pre}
          onChange={handleSort}
          value={sortData.sortField}
        >
          <option value="order"> Ordenar por Precio</option>
          <option value="DESC"> Mayor precio </option>
          <option value="ASC"> Menor precio </option>
        </select>
      </div>
      <form onSubmit={handleFiltersSubmit} name={"price"}>
        <div className={style.precio}>
          <label className={style.pri}> Precio : </label>
          <hr></hr>
          <input
            className={style.min}
            type="number"
            placeholder=" $ Mínimo "
            name="min"
            value={inputFilters.min}
            onChange={handleFiltersOnChange}
          />

          <input
            className={style.max}
            type="number"
            placeholder=" $ Maximo "
            name="max"
            value={inputFilters.max}
            onChange={handleFiltersOnChange}
          />
          <button className={style.btn}> Buscar </button>
        </div>
      </form>
      <div>
        <form
          autocomplete="off"
          className={style.precio}
          onSubmit={handleFiltersSubmit}
        >
          <label className={style.ubi}> Ubicacion : </label>
          <input
            className={style.zon}
            type="search"
            placeholder="Zona"
            name="ubication"
            value={inputFilters.ubication}
            onChange={handleFiltersOnChange}
            list="ubi"
          />
          <datalist id="ubi">
            {ubica?.map((t) => {
              return <option key={t} value={t}></option>;
            })}
          </datalist>
          <button className={style.btn}> Buscar </button>
        </form>
        <div>
          <select
            className={style.hora}
            onChange={handleSelectFilters}
            name={"horario"}
            value={selectFilters.horario}
          >
            <option> Filtrar por Horario </option>
            <option value="Mañana"> Mañana </option>
            <option value="Tarde/Noche"> Tarde </option>
            <option value="Full"> Todos </option>
          </select>
        </div>
        <div>
          <select
            className={style.serv}
            onChange={handleSelectFilters}
            name={"service"}
            value={selectFilters.service}
          >
            <option> Filtrar por Servicio </option>
            <option value="Paseador"> Paseador </option>
            <option value="Cuidador"> Cuidador </option>
            <option value=" Paseador y Cuidador"> Paseador y Cuidador </option>
          </select>
        </div>
        <div>
          <button className={style.atc} onClick={handleOnClick}>
            {" "}
            Todos los Paseadores{" "}
          </button>
          <Link to="/cardsUsers/map">
            <button className={style.atc}>Ver en mapa</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FiltersAndSortSection;
