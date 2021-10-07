import React from 'react'
import style from './nav.module.css'
import { Link } from 'react-router-dom'
import {useSelector } from "react-redux";
import { useHistory } from "react-router";

const nav = () => {

    
    const history = useHistory();
    
      function handleOnClick(e) {
        localStorage.clear();
        history.push(`/login`);
    
      }

    var id = localStorage.getItem("userId");
    var walker =localStorage.getItem("userWalker");
    console.log("aaaaaaaaaa"+walker)
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
           <div className={style.log}>
               {walker==="true" && <Link to={`/walker/perfil/${id}`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Mi perfil</span>
                </Link> }
                {walker==="false" &&
                <Link to={`/Cliente/${id}`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Mi perfil</span>
                </Link>}
                <button className={style.logout} onClick={e => { handleOnClick(e) }}>
                <span class="material-icons-outlined">
                        logout
                    </span>
                    <span>
                        Log Out
                    </span>
                </button>
            </div>    
         </div>
    )
}

export default nav
