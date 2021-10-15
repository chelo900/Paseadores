<<<<<<< HEAD
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
=======
import React from "react";
import { useDispatch } from "react-redux";
>>>>>>> 24d626b (jwt fixed)
import style from "./Usuario.module.css";
import {
  makeAdmin,
  resetPassword,
  deleteUserAccount,
  getClients,
  getWalkers,
<<<<<<< HEAD
  getAssessment,
} from "../../actions/index";
import swal from "sweetalert";
=======
} from "../../actions/index";
>>>>>>> 24d626b (jwt fixed)

const Usuario = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
<<<<<<< HEAD
  const score = useSelector((state) => state.score);
  console.log(score);

  useEffect(() => {
    dispatch(getAssessment(props.id, token));
  }, [dispatch]);

  function handleOnClickAdmin(e, usuario) {
    (() => {
      swal({
        title: "Confirmar si quiere que el usuario "+ props.email +" se convierta en admin",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((respuesta) => {
        if (respuesta) {
          swal({ text: "Convertido a admin", icon: "success" });
          dispatch(makeAdmin({ id: props.id }, token));
          setTimeout(function () {
            if (usuario === "Paseadores / Cuidadores") {
              dispatch(getWalkers(undefined, token));
            } else if (usuario === "Dueños") {
              dispatch(getClients(undefined, token));
            }
          }, 2000);
        } else {
          swal({ text: "Cancelado", icon: "warning" });
        }
      });
    })()
    
  }


  function handleOnClickResetPassword(e, usuario) {
    (() => {
      swal({
        title: "Confirmar si quiere enviar mail a: "+ props.email +" para resetear su contraseña",
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((respuesta) => {
        if (respuesta) {
          swal({ text: "Email enviado", icon: "success" });
          dispatch(resetPassword({ id: props.id }, token));
          setTimeout(function () {
            if (usuario === "Paseadores / Cuidadores") {
              dispatch(getWalkers(undefined, token));
            } else if (usuario === "Dueños") {
              dispatch(getClients(undefined, token));
            }
          }, 2000);
        } else {
          swal({ text: "Cancelado", icon: "warning" });
        }
      });
    })()
  }

  
  function handleOnClickDelete(e, usuario) {
    (() => {
      swal({
        title: "Confirmar si quiere eliminar al usuario: "+ props.email,
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then((respuesta) => {
        if (respuesta) {
          swal({ text: "Usuario eliminado", icon: "success" });
          dispatch(deleteUserAccount({ id: props.id }, token));
          setTimeout(function () {
            if (usuario === "Paseadores / Cuidadores") {
              dispatch(getWalkers(undefined, token));
            } else if (usuario === "Dueños") {
              dispatch(getClients(undefined, token));
            }
          }, 2000);
        } else {
          swal({ text: "Cancelado", icon: "warning" });
        }
      });
    })()
   
=======

  /*
    useEffect(() => {
        if(props.usuario === "PASEADORES/CUIDADORES"){
            dispatch(getWalkers())
        }else if(props.usuario === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}
    },[getClients])
    */
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
>>>>>>> 24d626b (jwt fixed)
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
<<<<<<< HEAD
          <p className={style.p}> Reputación : {score}</p>
=======
          <p className={style.p}> Reputación : {props.reputation}</p>
>>>>>>> 24d626b (jwt fixed)
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
