import React from 'react'
import style from './Contact.module.css'

const Contact = () => {

    return (
        <div className={style.container} id='contact'>
            <div className={style.contact}>
                <h1>Contact</h1>
            </div>
            <div className={style.listContact}>
                <div className={style.list}>
                    <h4>Phone</h4>
                    <p>+54 353 - 4196213</p>
                </div>
                <div className={style.list}>
                    <h4>Email</h4>
                    <p>Happydog@gmail.com</p>
                </div>
                <div className={style.list}>
                    <h4>Hours of Operation</h4>
                    <p>Mon - Fri : 8:00 am - 8:00 pm</p>
                    <p>Saturday : 8:00 am - 12:00 pm</p>
                </div>
                <div className={style.list}> 
                    <h4>Area of Service</h4>
                    <p>Argentina</p>
                    <p>Cordoba</p> 
                </div>
            </div>
            <div>
               <div className={style.form1}>
                    <div className={style.form}>
                        <input 
                        type='text' 
                        placeholder='Name'/>
                    </div>
                    <div className={style.form}>
                        <input 
                        type='text' 
                         placeholder='Email'/>
                    </div>
               </div>
                <div className={style.form2}>
                    <textarea type='text'  placeholder='Type your message here...'/>
                </div>
                <div className={style.botonContainer}>
                    <button className={style.boton}>Submit</button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Contact
