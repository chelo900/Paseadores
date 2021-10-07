import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './PerfilCliente.module.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getClienteForId } from "../../actions/index"
// import fotoPortada from '../../media/foto1.jpg'
import Nav from './nav/nav';

const PerfilCliente = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
  
    const Client = useSelector((state) => state.detailCliente);

    useEffect(() => {
        dispatch(getClienteForId(id))
    }, [dispatch])


return (
    <div className = {style.container}>
        <Nav/>
        <div className={style.containerPerfil} >
            <div className={style.personalInformation} >
                <div className={style.borderFoto} >
                    <div className={style.fotoPerfil} >
                        {Client.image ? <img src={Client.image} /> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" />}
                    </div>
                </div>
                <div className={style.informacion} >
                    <h2>{Client.name} {Client.surname}</h2>
                    <ul>
                        <li className={style.liPhone}>{Client.phone}</li>
                        <li className={style.liEmail}>{Client.email}</li>
                        <li className={style.liUbication}>{Client.ubication}</li>
                    </ul>
                    <Link to={`/Cliente/editInformation/${id}`} className={style.editContainerInfo} >
                        <button className={style.editDescription} > Editar Informacion </button>
                    </Link>
                </div>
            </div>

            <div className={style.caracteristicas}>
                <div className={style.descripcion} >
                    <h2> Description </h2>
                    <div className={style.textDescription} >
                        {Client.description ? <p> className={style.textDescriptionNew} {Client.description} </p> 
                        : <p> Agrega una descripcion </p>}
                    </div>
                    <Link to={`/Cliente/editDescription/${id}`}  className={style.editContainer} >
                        <button className={style.editDescription} > Editar Descripcion </button>
                    </Link>
                </div>
                <div className={style.reputacion} >
                    <h2> Reputacion </h2>
                    <div  className={style.textDescription} >
                        <p> * * * * * </p>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
    )
}

export default PerfilCliente;
