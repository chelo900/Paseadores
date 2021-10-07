import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { putDetailsCliente } from "../../actions/index"

import style from './descripcion.module.css'

const EditDescripcion = () => {

    const [input, setInput] = useState({
        description: '' })

    const newIdCliente =useSelector(state => state.detailCliente.id)

    const dispatch = useDispatch();

    const history = useHistory();
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handlerSubmit = ()=>{
        dispatch(putDetailsCliente(newIdCliente, input))
        console.log("cambios")
        alert('Cambios Efectuados')
        history.push(`/Cliente/perfil/${newIdCliente}`)

    }
    return (
        <div className={style.container}>
            <form className={style.formulario} onSubmit={handlerSubmit}>
                <h1>Descripcion</h1>
                <textarea 
                type='text'
                name='description'
                value={input.description}
                placeholder='Descripcion..'
                onChange={e=>inputChange(e)}/>
                <button type='submit'>Editar</button>
            </form>
        </div>
    )
}

export default EditDescripcion
