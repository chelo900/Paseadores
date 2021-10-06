import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './PerfilCliente.module.css'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getClienteForId } from "../../actions/index"

const PerfilCliente = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
  
    const Client = useSelector((state) => state.detailCliente);

    useEffect(() => {
        dispatch(getClienteForId(id))
    }, [dispatch])


return (
    <div >
        <div>
            img portada
        </div>
        <div >
            <div >
                <div>
                {Client.image ? <img src={Client.image} /> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" />}
                </div>
                <div >
                    <h2>{Client.name} {Client.surname}</h2>
                    <ul>
                        <li className={style.liPhone}>{Client.phone}</li>
                        <li className={style.liEmail}>{Client.email}</li>
                        <li className={style.liUbication}>{Client.ubication}</li>
                    </ul>
                    <Link to={`/Cliente/editInformation/${id}`} >
                        <button >Editar Informacion</button>
                    </Link>
                </div>
            </div>

            <div>
                <div>
                    <h2>Description</h2>
                    <div >
                        {Client.description ? <p> {Client.description} </p> 
                        : <p> Agrega una descripcion </p>}
                    </div>
                    <Link to={`/Cliente/editDescription/${id}`} >
                        <button >Editar Descripcion</button>
                    </Link>
                </div>
                <div >
                    <h2>Reputacion</h2>
                    <div>
                        <p> * * * * *</p>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
    )
}

export default PerfilCliente;
