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
                        <button className={style.boton}>Paseador / Cuidador</button>
                    </Link>
                    <Link>
                        <button  className={style.boton} >Dueno de mascota</button>
                    </Link>
                </div>
                <div className={style.count}>
                    <p>Do you already have an account?  </p>
                    <Link to ='/login'>
                        <a href='#'>  Sign In</a>
                    </Link>
                </div>

            </div>
            
        </div>
    )
}

export default PreLogin
