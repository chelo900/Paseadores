import React from "react";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getPaseadorPremuim } from "../../actions/index";
// import TouchCarousel from 'react-touch-carousel'
// import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "./Carrusel.module.css"
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import Paginado from './Paginado';


function Carrusel ({ id, name, surname, image }) {

    const usersPremium = useSelector(state => state.premium)
    console.log("CHAU", usersPremium)

    // const [currentPage, setCurrentPage] = useState(0); 
    // const [usersPremiumPerPage, setusersPremiumPerPage] = useState(7) 
    // const indexOfLastusersPremium = currentPage * usersPremiumPerPage
    // const indexOfFirstusersPremium = indexOfLastusersPremium - usersPremiumPerPage
    // const currentusersPremium = usersPremium.slice(indexOfFirstusersPremium, indexOfLastusersPremium) 

// const paginado = (pageNum) => {
//     setCurrentPage(pageNum)
// }

// function handleNextPage(e) {
//   e.preventDefault();
//   setCurrentPage(currentPage + 1);
// }

// function handlePrevPage(e) {
//   e.preventDefault();
//   setCurrentPage(currentPage - 1);
// }

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getPaseadorPremuim())
},[])

return (
 
  <div className = {style.carrusel} >
    <h3 className = {style.titulo}>Usuarios Premium</h3>
      <div className = {style.cartas}>
        {usersPremium.map((pr) => {
          return (
            <CardCarrusel
              key={pr.id}
              id={pr.id}
              name={pr.name}
              surname={pr.surname}
              image={pr.image}
            />
          );
        }
        )}
      </div>
  </div>

)

// const usersPremium = useSelector(state => state.premium)

// useEffect(() => {
//   dispatch(getPaseadorPremuim())
// },[dispatch])


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
            {/* <div>
              <button onClick = {e => handlePrevPage(e)}> &#60; </button>
            </div>
            <div>
              <button onClick = {e => handleNextPage(e)} > &#62; </button>
            </div> */}
            {/* <div className={style.pag} >
                <Paginado 
                usersPremiumPerPage = {usersPremiumPerPage}
                usersPremium = {usersPremium.length}
           
                />
            </div> */}
            {/* </div> 
        </div> */}