import React, { useState } from 'react'
import style from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../actions/index";
import Swal from "sweetalert2";

const Nav = (props) => {
    const [open, setOpen] = useState(false)

    const history = useHistory();
    const dispatch = useDispatch();

    function handleOnClick(e) {
        localStorage.clear();
        history.push(`/`);
        dispatch(clearUser({}))
    }

    const handleSalir = (e) => {
        Swal.fire({
          title: "¿Desea cerrar sesion?",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: 'Si',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handleOnClick(e)
            Swal.fire('Sesion cerrada')
          } else if (result.isDenied) {
            Swal.fire('Sesion no cerrada')
          }
        })
        console.log("holaallala")
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
            <div>
                <button className={style.logout} onClick={e => { handleSalir(e) }}>
                    <div className={style.home2}>
                        <span class="material-icons-outlined"> logout </span>
                        <span> Log Out </span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Nav
