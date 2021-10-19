import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Usuario.module.css";
import {
  makeAdmin,
  resetPassword,
  deleteUserAccount,
  getClients,
  getWalkers,
  getAssessment,
} from "../../actions/index";

const Usuario = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const score = useSelector((state) => state.score);
  console.log(score);

  useEffect(() => {
    dispatch(getAssessment(props.id, token));
  }, [dispatch]);

  function handleOnClickAdmin(e, usuario) {
    dispatch(makeAdmin({ id: props.id }, token));
    setTimeout(function () {
      if (usuario === "Paseadores / Cuidadores") {
        dispatch(getWalkers(token));
      } else if (usuario === "Dueños") {
        dispatch(getClients(token));
      }
    }, 2000);
  }
  function handleOnClickResetPassword(e, usuario) {
    console.log(usuario);
    dispatch(resetPassword({ id: props.id }, token));
    setTimeout(function () {
      if (usuario === "Paseadores / Cuidadores") {
        dispatch(getWalkers(token));
      } else if (usuario === "Dueños") {
        dispatch(getClients(token));
      }
    }, 2000);
  }
  function handleOnClickDelete(e, usuario) {
    dispatch(deleteUserAccount({ id: props.id }, token));
    setTimeout(function () {
      if (usuario === "Paseadores / Cuidadores") {
        dispatch(getWalkers(token));
      } else if (usuario === "Dueños") {
        dispatch(getClients(token));
      }
    }, 2000);
  }
  return (
    <div className={style.container}>
      <div className={style.izq}>
        <div>
          <p className={style.p}> Nombre : {props.name}</p>
          <p className={style.p}> Apellido : {props.surname}</p>
          <p className={style.p}> Número de teléfono : {props.phone}</p>
        </div>
        <div>
          <p className={style.p}> Email : {props.email}</p>
          <p className={style.p}> Descripción : {props.description}</p>
          <p className={style.p}> Reputación : {score}</p>
        </div>
      </div>
      <div className={style.der}>
        <button
          className={style.btnAdmin}
          onClick={(e) => {
            handleOnClickAdmin(e, props.usuario);
          }}
        >
          Hacer Administrador
        </button>
        <button
          className={style.btnContra}
          onClick={(e) => {
            handleOnClickResetPassword(e, props.usuario);
          }}
        >
          Resetear Contraseña
        </button>
        <button
          className={style.btnEliminar}
          onClick={(e) => {
            handleOnClickDelete(e, props.usuario);
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Usuario;
