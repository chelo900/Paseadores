import React,{useState} from 'react'
import style from './Edit.module.css'

const Edit = () => {
     
    const [input, setInput] = useState({price:''})
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    
    return (
        <div className={style.container}>
            <form className={style.formulario}>
                <h1>Price</h1>
                <input 
                type='text'
                name='price'
                value={input.value}
                placeholder='Price..'
                onChange={e=>inputChange(e)}/>
                <button>Editar</button>
            </form>        
        </div>
    )
}

export default Edit
