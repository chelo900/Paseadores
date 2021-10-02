import React from 'react'
import style from './header.module.css'
import foto from '../../../media/proceso2.jpg'
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <div className={style.container1} id='home'>
            <div className={style.form}>
                <h1>Happy</h1>
                <h1>Dog!</h1>
                <span>Sign up and meet us</span>   
                <Link to='/pre-login'>
                    <div>
                    <button className={style.botonP}>SIGN UP</button> 
                    </div>
                </Link> 
            </div>
            <div className={style.fotoForm}>
                <img src={foto} alt='foto' />
            </div>
        </div>
    )
}

export default Header
