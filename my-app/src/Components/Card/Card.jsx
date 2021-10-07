import React,{useState} from "react";
import { Link } from "react-router-dom"
import styles from "./Card.module.css"
import god from '../../media/DontLike.png'
import favorito from '../../media/favorito.png'
import estrella from '../../media/estrella.png'




function Card({ id, name, surname, image, reputation, service, price, description }) {

  const [fav, setFav]= useState(true)

const handlerFavorite = ()=>{
  console.log('estaentrando', fav)

  if(fav === false){
    setFav(true)
  }else if(fav === true){
    setFav(false)
  }
  
  
}

  return (
  
    
    <div className={styles.card} >
      
      <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt="foto paseador" width="220px" height="150px" />
          <div className={styles.reputacion}>
            <button className={styles.good}  >
              <img src={god} alt="" />
              <span>{reputation}</span>
            </button>            
            <button className={styles.bad}>
              <img src={god} alt="" />
              <span>{reputation}</span>
            </button>
          </div>
      </div>
      <div className={styles.title}>
     
          <h1 className={styles.name}>{name + " " + surname}</h1>
          <hr></hr>
          <h3>{service}</h3>
          {description? <span>{description}</span>: 
          <span>Este usuario no tiene cargada infomacion cargada.
             Para saber mas sobre este usuario oprima boton  "Saber mas", este te llevara directo a su perfil. Muchas gracias !</span>
             }
            
      <div className={styles.boton}>
        <Link to ={`/walker/perfil/${id}`}>
          <button>Saber mas...</button>
          
        </Link>
      </div>
      </div>
      <button className={styles.prueba} onClick={e=>handlerFavorite(e)}>
        {(fav === true)? <img src={favorito} alt='sas'/> : <img src={estrella} alt='' />}
        </button>
    </div>
  );
}

export default Card;
