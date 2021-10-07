import React from "react";
import { Link } from "react-router-dom"
import styles from "./Card.module.css"




function Card({ id, name, surname, image, reputation, service, price }) {
  return (
    
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <Link className={styles.link} to={`/home/${id}`}>
          <img className={styles.image} src={image} alt="foto paseador" width="220px" height="150px" />
        </Link>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.title}>
          <Link className={styles.link} to={`/home/${id}`}>
            <h3 className={styles.name}>{name + " " + surname}</h3>
          </Link>
        </div>
        <h1 className={styles.service}>Servicio: {service}</h1>
        <p className={styles.price}>Precio: {price}</p>
        <p className={styles.reputation}>Reputación: {reputation}</p>
      </div>
    </div>
  );
}

export default Card;
