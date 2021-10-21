import React from "react";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearUser } from "../../../actions/index";
import SearchBar from "../../SearchBar/SearchBar";

const Nav = ({page, pageSize}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    function handleOnClick(e) {
        localStorage.clear();
        history.push(`/`);
        dispatch(clearUser({}))
    }
    var id = localStorage.getItem("userId");
    var walker = localStorage.getItem("userWalker");
    var admin = localStorage.getItem("userAdmin");

    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
            <h1><SearchBar page={page} pageSize={pageSize}/></h1>
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
                    <div className={style.home2}>
                        <span class="material-icons-outlined">
                            logout
                        </span>
                        <span>
                            Log Out
                        </span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Nav;
