import React,{useState} from "react";
import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import god from '../../media/DontLike.png'
import favorito from '../../media/favorito.png'
import estrella from '../../media/estrella.png'
import { useDispatch, useSelector } from "react-redux";
import fotoDefault from '../../media/fotoAnonima.jpg'
import { postUserFavorite, getUserFavorites,deleteUserFavorite } from '../../actions/index'

// function Card({
//   id,
//   name,
//   surname,
//   image,
//   reputation,
//   service,
//   price,
//   description,
// }) {
//   const [fav, setFav] = useState(true);
//   const handlerFavorite = () => {
//     console.log("estaentrando", fav);


function Card({ id, name, surname, image, reputation, service, price, description, idCliente }) {

  const dispatch = useDispatch()

  const [fav, setFav]= useState(true)
  // const handlerFavorite = ()=>{
  //   console.log('estaentrando', fav)
    
  //   if(fav === false){
  //     setFav(true)
  //   }else if(fav === true){
  //     setFav(false)
  //   }
  // }
  var walker =localStorage.getItem("userWalker");

  
  const stateFavorites = useSelector((state) => state.favorites);
  

  function isFavorite (id) {
    

    let favorite = stateFavorites.filter(el => el.id === id)
    
    if(favorite.length > 0){
        return true
    }
    return false
}
async function addFavorite (id) {
    if(isFavorite(id) === false){
      let data = {idclient: idCliente, iduser: id}
      

      await postUserFavorite(data)
   
      await getUserFavorites(idCliente)
      isFavorite(id)
      alert('usuario agregado a favoritos!')
    }
  else{
    await deleteUserFavorite({idclient: id, iduser: id})
    await getUserFavorites(idCliente)
    isFavorite(id)
    await alert('usuario eliminado de favoritos!')
  }
}


  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
      {image?<img className={styles.image} src={image} alt="foto paseador"/> : <img  className={styles.image}  src={fotoDefault} alt= 'a'/>}
         {walker==="false" && 
          <div className={styles.reputacion}>
            <button className={styles.good}>
              <img src={god} alt="" />
              <span>{reputation}</span>
            </button>
            <button className={styles.bad}>
              <img src={god} alt="" />
              <span>{reputation}</span>
            </button>
          </div>
        })
      </div>
      <div className={styles.title}>
        <h1 className={styles.name}>{name + " " + surname}</h1>
        <hr></hr>
        <h3>{service}</h3>
        {description ? (
          <span>{description}</span>
        ) : (
          <span>
            Este usuario no tiene infomacion cargada. Para saber mas sobre este
            usuario oprima boton "Saber mas", este te llevara directo a su
            perfil. Muchas gracias !
          </span>
        )}
        <div>{price}</div>
        {walker === "false" && (
          <div className={styles.boton}>
            <Link to={`/walker/perfil/contacto/${id}`}>
              <button>Saber mas...</button>
            </Link>
          </div>
        )}
      </div>
      {walker==="false" &&   
      <button className={styles.prueba} onClick={e=>addFavorite(id)}>
        {isFavorite(id)?  <img src={estrella} alt='' /> : <img src={favorito} alt='sas'/>}
        </button>
      }
    </div>
  );
}

export default Card;
