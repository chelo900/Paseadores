import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router'
import { putDetailsUser } from '../../../actions'
import style from './Edit.module.css'

const Edit = () => {

    const history = useHistory()

    const dispatch = useDispatch();

    const { id } = useParams();

    const paseador =useSelector(state => state.detailWalker)
    
    const [input, setInput] = useState({
        service:'',
        birth_day:'',
        phone:'',
        email:'',
        ubication:'',
        dni:'',
        image:''
    })
    
    const inputChange = (e)=>{
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleLogout = (event) => {
        event.preventDefault();
        history.push(`/walker/perfil/${id}`);
      };

    const handlerSubmit =()=>{
        dispatch(putDetailsUser(id, input))
        alert('Cambios Efectuados')
        history.push(`/walker/perfil/${id}`)
    }
    
    return (
        <div className={style.container}>
            <form className={style.formulario} onSubmit={handlerSubmit}>
                <h1>Informacion</h1>
                <select value={input.service} defaultValue={paseador.service} name='service' onChange={inputChange}>
                    <option>Seleccione Servicio:</option>
                    <option value='Walker'>Paseador</option>
                    <option value='Carer'>Cuidador</option>
                    <option value='Walker and Carer'>Paseador y Cuidador</option>
                </select>
                <input
                type='date'
                name='birth_day'
                // defaultValue={paseador.birth_day}
                value={input.value}
                placeholder='Fecha de Nacimiento'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='phone'
                // defaultValue={paseador.phone}
                value={input.value}
                placeholder='Telefono'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='email'
                // defaultValue={paseador.email}
                value={input.value}
                placeholder='Email'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='ubication'
                // defaultValue={paseador.ubication}
                value={input.value}
                placeholder='Ubicacion'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='dni'
                // defaultValue={paseador.dni}
                value={input.value}
                placeholder='DNI'
                onChange={e=>inputChange(e)}/>
                <div className={style.selectFile}>
                    <label>Selecciona una imagen de perfil</label>
                    <input 
                    type='file' 
                    name='image'
                    value={input.value}
                    className={style.file} />
                </div>
                <button type='submit'>Editar</button>
            </form>
            <br/>
            <br/>
            <button className={style.volver} onClick={handleLogout}> Volver </button>
        </div>
    )
}
export default Edit
