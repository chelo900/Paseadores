import React from "react";
import style from "./PreLogin.module.css";
import { Link } from "react-router-dom";

const PreLogin = () => {
  return (
    <div className={style.container}>
      <div className={style.formulario}>
        <div className={style.title}>
          <h1>Registrarse como:</h1>
        </div>
        <hr></hr>
        <div className={style.botones}>
          <Link to="/login-walkwer">
            <button className={style.boton}>
              <p>Paseador / Cuidador</p>
            </button>
          </Link>
          <Link to="/login-client">
            <button className={style.boton}>
              <p>Dueño de mascota</p>
            </button>
          </Link>
        </div>
        <div className={style.count}>
          <p>Ya tienes una cuenta ? </p>
          <Link className={style.a} to="/login">
            <span>Iniciar sesión</span>
          </Link>
          <Link className={style.inicio} to="/">
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreLogin;
