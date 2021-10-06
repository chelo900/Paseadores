import React from 'react'
import style from './Contact.module.css'

const Contact = () => {

    return (
        <div className={style.container} id='contact'>
            <div className={style.contact}>
                <h1>Contacto</h1>
            </div>
            <div className={style.listContact}>
                <div className={style.list}>
                    <h4>Teléfono</h4>
                    <p>+54 353 - 4196213</p>
                </div>
                <div className={style.list}>
                    <h4>Email</h4>
                    <p>Happydog@gmail.com</p>
                </div>
                <div className={style.list}>
                    <h4>Horario</h4>
                    <p>Lunes - Viernes : 8:00 am - 8:00 pm</p>
                    <p>Sábado : 8:00 am - 12:00 pm</p>
                </div>
                <div className={style.list}>
                    <h4>Area de Servicio</h4>
                    <p>Argentina</p>
                    <p>Cordoba</p>
                </div>
            </div>
            <div>
                <div className={style.form1}>
                    <div className={style.formName}>
                        <input
                            type='text'
                            placeholder='Nombre' />
                    </div>
                    <div className={style.formEmail}>
                        <input
                            type='text'
                            placeholder='Email' />
                    </div>
                </div>
                <div className={style.form2}>
                    <textarea type='text' placeholder='Escribe tu mensaje aquí...' />
                </div>
                <div className={style.divBtn}>
                    <div className={style.botonContainer}>
                        <button className={style.boton}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
