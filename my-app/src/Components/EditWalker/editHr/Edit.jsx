import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router'
import { putDetailsProfile } from '../../../actions'
import style from './Edit.module.css'

const Edit = () => {
    const [input, setInput] = useState({ schedule: '' })

    const { id } = useParams();


    const dispatch = useDispatch();

    const history = useHistory();

    const inputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = () => {
        dispatch(putDetailsProfile(id, input))
        history.push(`/walker/perfil/${id}`)

    }

    return (
        <div className={style.container}>
            <form onSubmit={handlerSubmit} className={style.formulario}>
                <h1>Precio  </h1>
                <input
                    type='time'
                    name='schedule'
                    value={input.value}
                    onChange={e => inputChange(e)} />
                {/* <input 
                type='time'
                name='schedule'
                value={input.value}
                onChange={e=>inputChange(e)}/> */}
                <button type='submit'>Editar</button>
            </form>
        </div>
    )
}

export default Edit
