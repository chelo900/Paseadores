import React from 'react'
import style from './PreLogin.module.css'
import { Link } from 'react-router-dom'

const PreLogin = () => {
    return (
        <div className={style.container}>
            <div className={style.formulario}>
                <div className={style.title}>
                    <h1>Registrarse como:</h1>
                </div>
                <hr></hr>
                <div className={style.botones}>
                    <Link to='/login-walkwer' > 
                        <button className={style.boton}><p>Paseador / Cuidador</p></button>
                    </Link>
                    <Link>
                        <button  className={style.boton} ><p>Dueno de mascota</p></button>
                    </Link>
                </div>
                <div className={style.count}>
                    <p>Do you already have an account?</p>
                    <Link className={style.link} to ='/login'>
                        <p>  Sign In</p>
                    </Link>
                </div>

            </div>
            
        </div>
    )
}

export default PreLogin
