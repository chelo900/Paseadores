import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Admin.module.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getClients, getWalkers } from "../../src/actions/index"
import Nav from './nav/nav';
import Usuario from "./Usuario"

const Admin = () => {
  const dispatch = useDispatch();

  const usuarios = useSelector((state) => state.allPaseadores);
  const [titulo, setTitulo] = useState("");
  const [user, setUser] = React.useState({
    email: '',
  })
  /*
    useEffect(() => {
      
      if(titulo === "PASEADORES/CUIDADORES"){
          dispatch(getWalkers())
      }else if(titulo === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}
    
  },[getWalkers,getClients])*/

  function handleOnClickWalker(e) {
    dispatch(getWalkers())
    setTitulo("PASEADORES/CUIDADORES")
  }

  function handleOnClickClients(e) {
    dispatch(getClients())
    setTitulo("DUEÑOS DE LAS MASCOTAS")
  }

  function handleChange(e) {
    setUser({
      ...setUser,
      [e.target.name]: e.target.value
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
    if (titulo === "PASEADORES/CUIDADORES") {
      dispatch(getWalkers(user.email))
    } else if (titulo === "DUEÑOS DE LAS MASCOTAS") { dispatch(getClients(user.email)) }
  }

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerPerfil} >
        <div className={style.caracteristicas}>
          <div className={style.descripcion} >
            <div className={style.descripcion} >
              <h1>SOY EL ADMIN</h1>
              <button className={style.logout} onClick={e => { handleOnClickWalker(e) }}>PASEADORES</button>
              <button className={style.logout} onClick={e => { handleOnClickClients(e) }}>DUEÑOS DE MASCOTA</button>
              <input type="search" name="email" placeholder="Buscar por email..." onChange={handleChange} value={user.email} />
              <button onClick={e => { handleOnClick(e) }}>Buscar </button>
              <h2> {titulo} </h2>
              {!usuarios.length ? "" : usuarios?.map(el => {
                return (
                  <Usuario id={el.id} name={el.name} surname={el.surname} email={el.email} phone={el.phone} descripcion={el.descripcion} reputation={el.reputation} usuario={titulo} usu={usuarios} />
                )
              })
              }
              <div className={style.textDescription} >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;
