import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { putDetailsProfile } from '../../../actions'

import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import style from './Edit.module.css'

const Edit = () => {

    const [input, setInput] = useState({ description: '' })

    var id = localStorage.getItem("userId");
    


    const dispatch = useDispatch();

    const history = useHistory();

    const inputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleLogout = (event) => {
        event.preventDefault();
        history.push(`/walker/perfil/${id}`);
      };

    const handlerSubmit =  ()=>{
        console.log("acaaaaaaaaaaaaaaaa")
        console.log(id)
        console.log(input)
        
       dispatch(putDetailsProfile(id, input))
         Swal.fire({
            icon: 'success',
            title: 'Cambios Efectuados',
            showConfirmButton: false,
            timer: 1500
          })
        history.push(`/walker/perfil/${id}`);
    };


    
    return (
        <div className={style.container}>
            <form className={style.formulario} onSubmit={handlerSubmit}>
                <h1>Descripción</h1>
                <textarea
                    className={style.textarea}
                    type='text'
                    name='description'
                    value={input.value}
                    placeholder='Descripcion..'
                    onChange={e => inputChange(e)} />
                <div className={style.containerBtn}>
                    <Link to={`/walker/perfil/${id}`}>
                    <button className={style.volver} onClick={handleLogout}> Atrás </button>
                    </Link>
                        <button className={style.edit} type='submit'>Guardar cambios</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
