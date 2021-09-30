import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getPaseadorForId} from '../../actions/index'
import fotoPortada from '../../media/foto1.jpg'
import style from './PerfilWalker.module.css'
import foto1 from '../../media/foto1Service.jpg'
import { Link } from 'react-router-dom'


const PerfilWalker = (props) => {


    const dispatch = useDispatch()

    const Walker = useSelector(state => state.detailWalker)

    useEffect(()=>{
        dispatch(getPaseadorForId(props.match.params.id))
    },[dispatch])




    return (
        <div className={style.container}>
            <div className={style.containerPortada}>
                <img src={fotoPortada} alt='foto'/>
            </div>
            <div className={style.containerPerfil}>
                <div className={style.personalInformation}>
                    <div className={style.fotoPerfil}>
                        <img src="https://album.mediaset.es/eimg/10000/2021/06/09/clipping_E0q5Fu_d6a2.jpg" alt='' />
                    </div>
                    <div className={style.informacion}>
                        <h2>{Walker.name} {Walker.surname}</h2>
                        <ul>
                            <li>{Walker.service}</li>
                            <li>{Walker.birth_day}</li>
                            <li>{Walker.phone}</li>
                            <li>{Walker.email}</li>
                            <li>{Walker.ubication}</li>
                            <li>{Walker.dni}</li>
                        </ul>
                        <Link to='/walker/editInformation' className={style.editContainerInfo}>
                            <button className={style.editDescription}>Editar Informacion</button>
                        </Link>
                    </div>
                </div>

                <div className={style.caracteristicas}>
                    <div className={style.descripcion}>
                        <h2>Description</h2>
                        {Walker.caracteristicas? <p>{Walker.caracteristicas }</p> : <p>Agrega una descripcion</p> }
                        <Link to='/walker/editDescription' className={style.editContainer}>
                            <button className={style.editDescription}>Editar Descripcion</button>
                        </Link>
                    </div>
                    <div className={style.price}>
                        <h2>Price $</h2>
                        {Walker.price? <p>{Walker.price}</p> : <p>Ponle un precio a tu servicio</p>}
                        <Link to='/walker/editPrice' className={style.editContainer}>
                            <button className={style.edit}>Editar Precio</button>
                        </Link>
                    </div>
                    <div className={style.reputacion}>
                        <h2>Reputacion</h2>
                        <p> * * * * *</p>
                    </div>
                    <div className={style.fotos}>
                        <h2>Fotos</h2>
                        <div className={style.galeria}>
                            <img  src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                            <img src={foto1} alt='a'/>
                        </div>
                    </div>
                </div>

                <div className={style.notificaciones}>
               
                </div>
            </div>
            
        </div>
    )
}

export default PerfilWalker
