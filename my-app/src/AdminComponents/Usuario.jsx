import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Admin.module.css'
import { makeAdmin, resetPassword, deleteUserAccount, getClients, getWalkers} from "../actions/index"


const Usuario = (props) => {
    const dispatch = useDispatch();
   /*
    useEffect(() => {
        
        if(props.usuario === "PASEADORES/CUIDADORES"){
            dispatch(getWalkers())
        }else if(props.usuario === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}
      
    },[getClients])
   */

    function handleOnClickAdmin(e,usuario) {
        dispatch(makeAdmin({id:props.id}))
        setTimeout(function(){ if(usuario === "PASEADORES/CUIDADORES"){
            dispatch(getWalkers())
        }else if(usuario === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}; }, 2000);
      }

    function handleOnClickResetPassword(e,usuario) {
        console.log(usuario)
        dispatch(resetPassword({id:props.id}))
        setTimeout(function(){ if(usuario === "PASEADORES/CUIDADORES"){
            dispatch(getWalkers())
        }else if(usuario === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}; }, 2000);
        
      }

    function handleOnClickDelete(e,usuario) {
        dispatch(deleteUserAccount({id:props.id}))
        setTimeout(function(){ if(usuario === "PASEADORES/CUIDADORES"){
            dispatch(getWalkers())
        }else if(usuario === "DUEÑOS DE LAS MASCOTAS"){ dispatch(getClients())}; }, 2000);
       
      }


return (
    
                    
                        <div>
                        <h3>id={props.id}, name={props.name}, surname={props.surname}, email={props.email}, phone={props.phone}, description={props.description}, reputation={props.reputation} </h3>

                        <button className={style.logout} onClick={e => { handleOnClickAdmin(e, props.usuario) }}>Hacer Administrador</button>
                        <button className={style.logout} onClick={e => { handleOnClickResetPassword(e, props.usuario) }}>Resetear Contraseña</button>
                        <button className={style.logout} onClick={e => { handleOnClickDelete(e, props.usuario) }}>Eliminar</button>
                        </div>
                        
                               
    
    )
}

export default Usuario;
