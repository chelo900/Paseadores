import React from "react";
import { Link } from "react-router-dom";
import style from './nav.module.css'

const Nav = () => {

    var id =localStorage.getItem("userId");


    return (
        <nav className={style.navBar}>
            <div className={style.container}>
                <div className={style.title}>
                    <h3 className={style.logo}>Happy Dog!</h3>
                </div>
                <div className={style.containerA}>
                    <a href='#home'>Home</a>
                    <a href='#about'>Sobre Nosotros</a>
                    <a href='#services'>Servicios</a>
                    <a href='#contact'>Contacto</a>
                </div>
                <Link to='/login' className={style.login} >
                    <div className={style.containerLogin}>
                        <span className={style.icon} class="material-icons-outlined">account_circle</span>
                        <span className={style.log}>Iniciar Sesión</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}
export default Nav