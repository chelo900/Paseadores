import React,{useState} from 'react'
import style from './Edit.module.css'

const Edit = () => {
    const [input, setInput] = useState({
        service:'',
        birthDate:'',
        phone:'',
        email:'',
        ubication:'',
        dni:'',
        image:''
    })
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    
    return (
        <div className={style.container}>
            <form className={style.formulario}>
                <h1>Information</h1>
                <input
                type='text'
                name='service'
                value={input.value}
                placeholder='Service'
                onChange={e=>inputChange(e)}
                />
                <input
                type='text'
                name='birthDate'
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
                    <input type='file' className={style.file} />
                </div>
                <button>Editar</button>
            </form>
            
        </div>
    )
}
export default Edit
