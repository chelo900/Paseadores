import React, { useState } from 'react'
import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../actions/index";
import menu from '../../../media/menu.png'
const Nav = (props) => {
    const [open, setOpen] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch();

    const handlerHamburguer = () => {
        setOpen(!open)
    }

    function handleOnClick(e) {
        localStorage.clear();
        history.push(`/`);
        dispatch(clearUser({}))
    }
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
            <div className={style.log}>
                <Link to={`/cardsUsers`} className={style.textdeco}>
                    <span class="material-icons-outlined">home</span>
                    <p>Home</p>
                </Link>
            </div>
        </div>
    )
}

export default Nav
