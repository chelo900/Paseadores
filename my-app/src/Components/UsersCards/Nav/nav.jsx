import React from "react";
import style from "./nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearUser } from "../../../actions/index";

const Nav = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    function handleOnClick(e) {
        localStorage.clear();
        history.push(`/login`);
        dispatch(clearUser({}));
    }

    var id = localStorage.getItem("userId");
<<<<<<< HEAD
    var walker =localStorage.getItem("userWalker");
    var admin =localStorage.getItem("userAdmin");
    
=======
    var walker = localStorage.getItem("userWalker");
    var admin = localStorage.getItem("userAdmin");

>>>>>>> 6ce2d2090c6633aee7b7399a7464de605234a054
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
<<<<<<< HEAD
           <div className={style.log}>
               {walker==="true" && <Link to={`/walker/perfil/${id}`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Mi perfil</span>
                </Link> }
                {walker==="false" && admin === "false" &&
                <Link to={`/Cliente/${id}`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Mi perfil</span>
                </Link>}
                {(walker==="false" && admin === "true") &&
                <Link to={`/admin`} className={style.home}>
                <span class="material-icons-outlined">school</span>
                <span>Usuarios</span>
                </Link>}
                <button className={style.logout} onClick={e => { handleOnClick(e) }}>
                <span class="material-icons-outlined">
=======
            <div className={style.log}>
                {walker === "true" && <Link to={`/walker/perfil/${id}`} className={style.home}>
                    <span class="material-icons-outlined">school</span>
                    <span>Mi perfil</span>
                </Link>}
                {walker === "false" && admin === "false" &&
                    <Link to={`/Cliente/${id}`} className={style.home}>
                        <span class="material-icons-outlined">school</span>
                        <span>Mi perfil</span>
                    </Link>}
                {(walker === "false" && admin === "true") &&
                    <Link to={`/admin`} className={style.home}>
                        <span class="material-icons-outlined">school</span>
                        <span>Usuarios</span>
                    </Link>}
                <button className={style.logout} onClick={e => { handleOnClick(e) }}>
                    <span class="material-icons-outlined">
>>>>>>> 6ce2d2090c6633aee7b7399a7464de605234a054
                        logout
                    </span>
                    <span>
                        Log Out
                    </span>
                </button>
<<<<<<< HEAD
            </div>    
         </div>
=======
            </div>
        </div>
>>>>>>> 6ce2d2090c6633aee7b7399a7464de605234a054
    )
}

export default Nav;
