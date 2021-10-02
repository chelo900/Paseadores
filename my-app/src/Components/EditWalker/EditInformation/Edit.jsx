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

    // const idNew =useSelector(state => state.detailWalker)
    
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

    const handlerSubmit =()=>{
        dispatch(putDetailsUser(id, input))
        history.push(`/walker/perfil/${id}`)
    }
    
    return (
        <div className={style.container}>
            <form className={style.formulario} onSubmit={handlerSubmit}>
                <h1>Information</h1>
                <select value={input.service} name='service' onChange={inputChange}>
                    <option>Select Service:</option>
                    <option value='Walker'>Walker</option>
                    <option value='Carer'>Carer</option>
                    <option value='Walker and Carer'>Walker and Carer</option>
                </select>
                <input
                type='date'
                name='birth_day'
                value={input.value}
                placeholder='Date of Birth'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='phone'
                value={input.value}
                placeholder='Phone Number'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='email'
                value={input.value}
                placeholder='Email'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='ubication'
                value={input.value}
                placeholder='Ubication'
                onChange={e=>inputChange(e)}/>
                <input
                type='text'
                name='dni'
                value={input.value}
                placeholder='DNI'
                onChange={e=>inputChange(e)}/>
                <div className={style.selectFile}>
                    <label>Select Image</label>
                    <input 
                    type='file' 
                    name='image'
                    value={input.value}
                    className={style.file} />
                </div>
                <button type='submit'>Editar</button>
            </form>
            
        </div>
    )
}
export default Edit
