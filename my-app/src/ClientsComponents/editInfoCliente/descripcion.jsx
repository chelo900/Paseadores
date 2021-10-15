import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { putDetailsProfileCliente } from "../../actions/index"
import Swal from 'sweetalert2'

import style from './descripcion.module.css'

const EditDescripcion = () => {

    const [input, setInput] = useState({
        description: '' })
        var id = localStorage.getItem("userId");
    // const newIdCliente =useSelector(state => state.detailCliente.id)
    
    const dispatch = useDispatch();

    const history = useHistory();

    const handleLogout = (event) => {
        event.preventDefault();
        history.push(`/Cliente/${id}`);
    };

    const inputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = () => {

        dispatch(putDetailsProfileCliente(id, input))
        
        Swal.fire({
            icon: 'success',
            title: 'Cambios Efectuados',
            showConfirmButton: false,
            timer: 1500
            
          })
        
        history.push(`/Cliente/${id}`)

    }
    return (
        <div className={style.container}>
            <form className={style.formulario} onSubmit={handlerSubmit}>
                <h1>Descripción</h1>
                <textarea
                    type='text'
                    name='description'
                    value={input.description}
                    placeholder='Descripción..'
                    onChange={e => inputChange(e)} />
                <div className={style.containerBtn}>
                        <button className={style.volver} onClick={handleLogout}> Atrás </button>
                    <button className={style.edit} type='submit'>Guardar cambios</button>
                </div>
            </form>
        </div>
    )
}

export default EditDescripcion
