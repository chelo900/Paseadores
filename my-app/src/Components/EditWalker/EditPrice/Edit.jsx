import React, { useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { putDetailsProfile } from '../../../actions'
import style from './Edit.module.css'
import Swal from 'sweetalert2'

const Edit = () => {
     
    const [input, setInput] = useState({price:''})
    
    // const { id } = useParams();
    const idNew =useSelector(state => state.detailWalker.id)

    // const paseador =useSelector(state => state.detailWalker)


    const dispatch = useDispatch();

    const history = useHistory();
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleLogout = (event) => {
        event.preventDefault();
        history.push(`/walker/perfil/${idNew}`);
      };

    const handlerSubmit = ()=>{
        dispatch(putDetailsProfile(idNew, input))
        Swal.fire({
            icon: 'success',
            title: 'Cambios Efectuados',
            showConfirmButton: false,
            timer: 1500
          })
        history.push(`/walker/perfil/${idNew}`)

    }
    
    return (
        <div className={style.container}>
            <form onSubmit={handlerSubmit} className={style.formulario}>
                <h1>Precio</h1>
                <input 
                type='text'
                name='price'
                value={input.value}
                placeholder='Precio..'
                onChange={e=>inputChange(e)}/>
                <button type='submit'>Editar</button>
            </form>        
            <br/>
            <br/>
            <button className={style.volver} onClick={handleLogout}> Volver </button>
        </div>
    )
}

export default Edit
