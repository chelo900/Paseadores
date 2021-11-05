import React from "react";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getPaseadorPremuim } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Carrusel.module.css";

import { shuffle } from "lodash";

function Carrusel() {
  const usersPremium = useSelector((state) => state.premium);
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaseadorPremuim(token));
  }, [dispatch, token]);

  return (
    <div className={style.carrusel}>
      <h3 className={style.titulo}>Usuarios Premium</h3>
      <div className={style.cartas}>
        {shuffle(usersPremium).map((pr) => {
          return (
            <CardCarrusel
              key={pr.id}
              id={pr.id}
              name={pr.name}
              surname={pr.surname}
              image={pr.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carrusel;
