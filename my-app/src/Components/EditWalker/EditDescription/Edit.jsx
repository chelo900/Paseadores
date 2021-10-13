import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { putDetailsProfile } from '../../../actions'
import { Link } from 'react-router-dom'
import style from './Edit.module.css'

const Edit = () => {

    const [input, setInput] = useState({ description: '' })

    // const { id } = useParams();
    const idNew = useSelector(state => state.detailWalker.id)

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
        history.push(`/walker/perfil/${idNew}`);
    };

    const handlerSubmit = () => {
        dispatch(putDetailsProfile(idNew, input))
        alert('Cambios Efectuados')
        history.push(`/walker/perfil/${idNew}`)

    }
    return (
        <div className={style.container}>
            {console.log(idNew)}
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
                    <button className={style.volver} onClick={handleLogout}> Atrás </button>
                    <Link to={`/walker/perfil/${idNew}`}>
                        <button className={style.edit} type='submit'>Guardar cambios</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Edit
