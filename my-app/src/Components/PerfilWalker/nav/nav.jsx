import React from 'react'
import style from './nav.module.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../actions/index";

const Nav = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    function handleOnClick(e) {
      localStorage.clear();
      history.push(`/login`);
      dispatch(clearUser({}))
    }
    return (
        <div className={style.container}>
            <div className={style.serviceContainer}>
                <h2 className={style.service}>Happy Dog!</h2>
            </div>
           <div className={style.log}>
                <Link to='/cardsUsers' className={style.home}>
                <span class="material-icons-outlined">home</span>
                <span>Home</span>
                </Link>
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

export default Nav
