import React from "react";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getPaseadorPremuim } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Carrusel.module.css";

function Carrusel() {
  
  const usersPremium = useSelector((state) => state.premium);
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaseadorPremuim(token));
  }, [dispatch, token]);

// const index = Math.floor(Math.random() * usersPremium.length);

// function Aleatorios(usersPremium) {
//   return [...usersPremium]
//   .sort(() => (Math.random() > 0.5 ? 1 : -1))

// random = function (usersPremium) {
//   return usersPremium[Math.floor((Math.random()*usersPremium.length))];
// } 

return (
  <div className = {style.carrusel} >
    <h3 className = {style.titulo}>Usuarios Premium</h3>
      <div className = {style.cartas}>
        {usersPremium.length > 0 ? (
          usersPremium.map((pr) => {
            return (
              <CardCarrusel
                key={pr.id}
                id={pr.id}
                name={pr.name}
                surname={pr.surname}
                image={pr.image}
              />
            );
          })
        ) : (
          <div>
            <p>No hay usuarios premium</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrusel;

/* <div className = {style.premium}>
          {usersPremium.length > 0 ? (
              usersPremium.map((pr) => {
                return (
                  <CardCarrusel
                    key={pr.id}
                    id={pr.id}
                    name={pr.name}
                    surname={pr.surname}
                    image={pr.image}
                  />
                );
              })
            ) : (
              <div>
                <p>No hay usuarios premium</p>
              </div>
            )}
        </div> */

// <div>
//     <div>
//         <h3 className={style.titulo}>Paseadores Premium</h3>
//     </div>
//     <div className = {style.carrusel}>
//         {usersPremium?.length > 0 ? (
//             usersPremium.map((pr) => {
//                 return (
//                 <CardCarrusel
//                     key={pr.id}
//                     id={pr.id}
//                     name={pr.name}
//                     surname={pr.surname}
//                     image={pr.image}
//                 />
//                 );
//             })
//             ) : (
//     <div>
//         <p>No hay usuarios premium</p>
//     </div>
//         )}
{
  /* <div>
              <button onClick = {e => handlePrevPage(e)}> &#60; </button>
            </div>
            <div>
              <button onClick = {e => handleNextPage(e)} > &#62; </button>
            </div> */
}
{
  /* <div className={style.pag} >
                <Paginado 
                usersPremiumPerPage = {usersPremiumPerPage}
                usersPremium = {usersPremium.length}
           
                />
            </div> */
}
{
  /* </div> 
        </div> */
}
