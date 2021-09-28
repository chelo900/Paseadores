import React from "react";
import { Link } from "react-router-dom";
import style from './nav.module.css'

const Nav = () =>{


    return(
        <nav className={ style.navBar }>
            <div className={style.container}>
                <h3 className={style.logo}>Happy Dog!</h3>
                <a href='#home'>home</a>
                <a href='#about'>About</a>
                <a href='#services'>Services</a>
                <a href='#contact'>Contact</a>
                <Link to ='/create' className={style.login} >
                    <span className={style.icon} class="material-icons-outlined">account_circle</span>   Log In
                </Link>

            </div>

        </nav>

    )
}
export default Nav