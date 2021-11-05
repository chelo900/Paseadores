import React, { useState, useEffect } from "react";
import CardsContainer from "./CardsContainer";
import Carrusel from "../Carrusel/Carrusel";
import Nav from "./Nav/Nav";
import FiltersAndSortSection from "./FiltersAndSortSection";
import BackgroundImages from "./BackgroundImages";
import Pagination from "./Pagination";
import style from "../UsersCards/UsersCards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaseadores, getUserFavorites } from "../../actions/index";
import Swal from "sweetalert2";

const UsersCards = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allPaseadores);

  const favorites = useSelector((state) => state.favorites);

  const [inputFilters, setInputFilters] = useState({
    min: "",
    max: "",
    ubication: "",
  });
  const [selectFilters, setSelectFilters] = useState({
    horario: "",
    service: "",
  });
  const [sortData, setSortData] = useState({ sortField: "" });

  // Pagination
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setLimitPerPage] = useState(5);

  const ubica = useSelector((state) => state.ubication);

  const token = localStorage.getItem("userToken");
  const walker = localStorage.getItem("userWalker");
  const id = localStorage.getItem("userId");
  const admin = localStorage.getItem("userAdmin");

  useEffect(() => {
    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
        token,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, selectFilters, sortData, dispatch]);

  useEffect(() => {
    if (walker === "false" && admin === "false") {
      dispatch(getUserFavorites(id, token));
    }
  }, []);

  function handleNextPage(e) {
    e.preventDefault();
    if (page < allUsers.totalPages - 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setPage(page + 1);
    } else {
      Swal.fire({
        title: "Ultima pagina !",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  }

  function handlePrevPage(e) {
    e.preventDefault();
    if (page === 0) {
      Swal.fire({
        title: "Primer pagina !",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      setPage(page - 1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
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
    const { min, max } = inputFilters;
    if (min && max && min > max) {
      setInputFilters({ ...inputFilters, min: "", max: "" });
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El precio minimo debe ser menor que el precio máximo",
        showDenyButton: false,
      });
    }

    dispatch(
      getAllPaseadores({
        page,
        pageSize,
        inputFilters,
        selectFilters,
        sortData,
        token,
      })
    );
  }

  function handleSelectFilters(event) {
    const { value, name } = event.target;
    setSelectFilters({ ...selectFilters, [name]: value });
  }

  function handleOnClick() {
    setSelectFilters({ horario: "", service: "" });
    setInputFilters({ min: "", max: "", ubication: "" });
    setSortData({ sortField: "" });
    setPage(0);
  }

  return (
    <div className={style.container}>
      <Nav />
      <BackgroundImages allUsers={allUsers} />
      <div className={style.containerDOS}>
        <div className={style.carrusel}>
          <Carrusel />
        </div>
        <div className={style.costado}>
          <FiltersAndSortSection
            sortData={sortData}
            handleSort={handleSort}
            inputFilters={inputFilters}
            handleFiltersSubmit={handleFiltersSubmit}
            handleFiltersOnChange={handleFiltersOnChange}
            ubica={ubica}
            selectFilters={selectFilters}
            handleSelectFilters={handleSelectFilters}
            handleOnClick={handleOnClick}
          />
        </div>

        <div className={style.cards}>
          <CardsContainer allUsers={allUsers} favorites={favorites} />
          <div className={style.pagination}>
            <Pagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCards;
