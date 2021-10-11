import React from 'react'
import style from './Premium.module.css'
import foto1 from '../../../media/premiumcortada.jpg'

const Premium = () => {
    return (
        <div className={style.total}>
            <div className={style.titulo}>
                <h1> Cuenta Premuim </h1>
            </div>
            <div className={style.extra}>
                <img className={style.imag} src={foto1} />
            <div className={style.premium}>
                <h3 className={style.nombre} > Beneficios </h3>
                <p className = {style.uno} > Permanecer simpre en la primera pagina.</p>
                <p className = {style.dos} > Subir ilimitadas publicaciones de tu trabajo.</p>
                <p className = {style.tres} > Mantener simpre el historial de los chats con los clientes.</p>
                <p className = {style.cuatro} > El costo es de tan solo $2 dolares por mes. </p>
                <p className = {style.cuatro} > Vas a poder contratarlo desde tu perfil una vez que te crees un usuario. </p>
            </div>
            </div>
        </div>
    )
}

export default Premium