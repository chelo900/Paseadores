import React, { useState, useEffect, useReducer } from "react";
import Card from "../Card/Card";
import Nav from "./Nav/Nav";
import style from "../UsersCards/UsersCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaseadores,getUserFavorites  } from "../../actions/index";

const UsersCards = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allPaseadores);
  const favorites = useSelector((state) => state.favorites);
 
  const [inputFilters, setInputFilters] = useState({});
  const [selectFilters, setSelectFilters] = useState({});
  const [sortData, setSortData] = useState({});

  // Paginado
  const [page, setPage] = useState(0);
  const [pageSize, setLimitPerPage] = useState(5);

  const ubica = useSelector((state) => state.ubication);
  var id = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
      })
      );
      dispatch(getUserFavorites(id))
  }, [page, pageSize, selectFilters, sortData, dispatch]);

  function handleNextPage(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(page + 1);
  }

  function handlePrevPage(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(page - 1);
  }

  function handleSort(event) {
    event.preventDefault();
    setSortData({
      ...sortData,
      sortField: event.target.name,
      isSortAscending: event.target.value === "ASC" ? true : false,
    });
  }

  function handleFiltersOnChange(event) {
    const { value, name } = event.target;
    setInputFilters({ ...inputFilters, [name]: value });
  }

  function handleFiltersSubmit(event) {
    event.preventDefault();
    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
      })
    );
  }

  function handleSelectFilters(event) {
    const { value, name } = event.target;
    setSelectFilters({ ...selectFilters, [name]: value });
  }

  function handleOnClick(event){
    event.preventDefault();
    setSelectFilters({});
    setInputFilters({});
    setSortData({});
    setPage(0);
  }

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerDOS}>
        <div className={style.costado}>
          <div>
            <select
              name="reputation"
              className={style.rep}
              onChange={handleSort}
            >
              <option value="order"> Ordenar por Reputacion </option>
              <option value="DESC"> Mayor reputacion </option>
              <option value="ASC"> Menor reputacion </option>
            </select>
          </div>
          <div>
            <select name="price" className={style.pre} onChange={handleSort}>
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
                onChange={handleFiltersOnChange}
              />

              <input
                className={style.max}
                type="number"
                placeholder=" $ Maximo "
                name="max"
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
                placeholder="Zona "
                name="ubication"
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
              >
                <option> Filtrar por Horario </option>
                <option value="morning"> Mañana </option>
                <option value="afternoon"> Tarde </option>
                <option value="all"> Todos </option>
              </select>
            </div>
            <div>
              <select
                className={style.serv}
                onChange={handleSelectFilters}
                name={"service"}
              >
                <option> Filtrar por Servicio </option>
                <option value="walker"> Paseador </option>
                <option value="carer"> Cuidador </option>
                <option value="walker and carer"> Paseador y Cuidador </option>
              </select>
            </div>
            <div>
              <button 
                className={style.atc}
                onClick={handleOnClick}
                > Todos los Paseadores </button>
            </div>
          </div>
        </div>

        <div className={style.cards}>
          {allUsers.content?.length > 0 ? (
            allUsers.content.map((el) => {
              var fv;
            favorites.length && favorites?.forEach((element) => 
              {if(element === el.id){
               fv = true
              }});
             
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
                  fv= {fv}
                />
              );
            })
          ) : (
            <div>
              <p>No se encontraron usuarios</p>
            </div>
          )}
          <div className={style.pagination}>
            {page === 0 ? null : (
              <button className={style.prev} onClick={handlePrevPage}>
                <p>&#60;</p>
              </button>
            )}
            {page === allUsers.totalPages - 1 ? null : (
              <button className={style.next} onClick={handleNextPage}>
                <p>&#62;</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCards;
