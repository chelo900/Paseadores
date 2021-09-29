import React from "react";
import { Link } from "react-router-dom"
import styles from "./Card.module.css"




function Card({ id, name, surname, image, reputation, service, price }) {

  return (

    <div className={styles.card} >
      <Link className={styles.link} to={`/home/${id}`}><h3 className={styles.name}>{name+" "+surname}</h3></Link>
      <Link className={styles.link} to={`/home/${id}`}><img src={image} alt="foto paseador" width="220px" height="150px" /></Link>
      <h5 className={styles.temperamentos}>Servicio: {service}</h5>
      <h5 className={styles.peso}>Precio: {price}</h5>
      <h5 className={styles.peso}>Reputación: {reputation}</h5>
    </div>

  );
}

export default Card;
