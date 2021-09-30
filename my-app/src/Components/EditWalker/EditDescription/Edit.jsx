import React, { useState }  from 'react'

import style from './Edit.module.css'

const Edit = () => {

    const [input, setInput] = useState({description:''})
    
    const inputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className={style.container}>
            <form className={style.formulario}>
                <h1>Description</h1>
                <textarea 
                type='text'
                name='description'
                value={input.value}
                placeholder='Description..'
                onChange={e=>inputChange(e)}/>
                <button>Editar</button>
            </form>
        </div>
    )
}

export default Edit
