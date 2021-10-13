import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Admin.module.css'
import { getClients, getWalkers } from "../../src/actions/index"
import Nav from './nav/Nav';
import Usuario from "./Usuario/Usuario"

const Admin = () => {
  const dispatch = useDispatch();

  const usuarios = useSelector((state) => state.allPaseadores);
  const [titulo, setTitulo] = useState("");
  const [user, setUser] = React.useState({
    email: '',
  })
 

  function handleOnClickWalker(e) {
    e.preventDefault()
    dispatch(getWalkers())
    setTitulo("Paseadores / Cuidadores")
  }

  function handleOnClickClients(e) {
    e.preventDefault()
    dispatch(getClients())
    setTitulo("Dueños")
  }

  function handleChange(e) {
    setUser({
      ...setUser,
      [e.target.name]: e.target.value
    });
  }

  function handleOnClick(e) {
    e.preventDefault();
    if (titulo === "Paseadores / Cuidadores") {
      dispatch(getWalkers(user.email))
    } else if (titulo === "Dueños") { dispatch(getClients(user.email)) }
  }

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerInfo} >
        <div className={style.descripcion} >
          <h1 className={style.title}>Tabla de administrador</h1>
          <div className={style.container2}>
            <div className={style.containerInput}>
              <input
                className={style.input}
                type="search"
                name="email"
                placeholder="Buscar por email..."
                onChange={handleChange}
                value={user.email} />
              <button className={style.inputBtn} onClick={e => { handleOnClick(e) }}>Buscar...</button>
            </div>
            <div>
              <button
                className={style.btn}
                onClick={e => { handleOnClickWalker(e) }}>Paseadores / Cuidadores</button>
              <button
                className={style.btn}
                onClick={e => { handleOnClickClients(e) }}>Dueños de mascotas</button>
            </div>
            <h2 className={style.subTitle}> {titulo} </h2>
            <div className={style.userContainer}>
              {!usuarios.length ? "" : usuarios?.map(el => {
                return (
                  <div>
                    <Usuario id={el.id} name={el.name} surname={el.surname} email={el.email} phone={el.phone} descripcion={el.descripcion} reputation={el.reputation} usuario={titulo} usu={usuarios} />
                  </div>
                )
              })
              }
            </div>
          </div>
          <div className={style.textDescription} >
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;
