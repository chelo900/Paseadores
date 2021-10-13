import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { putDetailsProfileCliente } from "../../actions/index"
import Swal from 'sweetalert2'

import style from './descripcion.module.css'

const EditDescripcion = () => {

    const [input, setInput] = useState({
        description: '' })

    // const newIdCliente =useSelector(state => state.detailCliente.id)
    const {id} = useParams()
    const dispatch = useDispatch();

    const history = useHistory();

    const handleLogout = (event) => {
        event.preventDefault();
        history.push(`/Cliente/${id}`);
      };
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handlerSubmit = ()=>{

        dispatch(putDetailsProfileCliente(id, input))
        console.log(id ,"cambios")
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
                <h1>Descripcion</h1>
                <textarea 
                type='text'
                name='description'
                value={input.description}
                placeholder='Descripcion..'
                onChange={e=>inputChange(e)}/>
                <button type='submit'>Editar</button>
            </form>
            <br/>
            <br />
            <button className={style.volver} onClick={handleLogout}> Volver </button>
        </div>
    )
}

export default EditDescripcion
