import React from "react";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getPaseadorPremuim } from "../../actions/index";
// import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
<<<<<<< HEAD
import style from "./Carrusel.module.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Paginado from './Paginado';

function Carrusel({ id, name, surname, image }) {
  const usersPremium = useSelector((state) => state.premium);
  const token = localStorage.getItem("userToken");

  // const [currentPage, setCurrentPage] = useState(0);
  // const [usersPremiumPerPage, setusersPremiumPerPage] = useState(7)
  // const indexOfLastusersPremium = currentPage * usersPremiumPerPage
  // const indexOfFirstusersPremium = indexOfLastusersPremium - usersPremiumPerPage
  // const currentusersPremium = usersPremium.slice(indexOfFirstusersPremium, indexOfLastusersPremium)
=======
import style from "./Carrusel.module.css"

function Carrusel () {
>>>>>>> a75dbc1 (.)

  // const paginado = (pageNum) => {
  //     setCurrentPage(pageNum)
  // }

<<<<<<< HEAD
  // function handleNextPage(e) {
  //   e.preventDefault();
  //   setCurrentPage(currentPage + 1);
  // }

  // function handlePrevPage(e) {
  //   e.preventDefault();
  //   setCurrentPage(currentPage - 1);
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaseadorPremuim(token));
  }, [dispatch, token]);

  return (
    <div className={style.carrusel}>
      <h3 className={style.titulo}>Usuarios Premium</h3>
      <div className={style.cartas}>
        {usersPremium.map((pr) => {
=======
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getPaseadorPremuim())
},[])

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
>>>>>>> a75dbc1 (.)
          return (
            <CardCarrusel
              key={pr.id}
              id={pr.id}
              name={pr.name}
              surname={pr.surname}
              image={pr.image}
            />
<<<<<<< HEAD
          );
        })}
      </div>
    </div>
  );

  // const usersPremium = useSelector(state => state.premium)

  // useEffect(() => {
  //   dispatch(getPaseadorPremuim())
  // },[dispatch])
=======
            );
          })
        ) : (
          <div>
            <p>No hay usuarios premium</p>
          </div>
        )}
      </div>
  </div>
  )
>>>>>>> a75dbc1 (.)
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
