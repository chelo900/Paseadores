import React from 'react'
import style from './nav.module.css'
import { Link } from 'react-router-dom'

const nav = ({id}) => {
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
           <div className={style.log}>
                <Link to={`/walker/perfil/${id}`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Mi perfil</span>
                </Link>
                <Link  className={style.logout}>
                    <span class="material-icons-outlined">
                        logout
                    </span>
                    <span>
                        Log Out
                    </span>
                </Link>
            </div>    
         </div>
    )
}

export default nav
