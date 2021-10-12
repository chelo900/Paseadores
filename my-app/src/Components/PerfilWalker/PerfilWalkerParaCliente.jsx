import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clientSendOrden,  getOrdenCliente, getPaseadorForId } from '../../actions/index'

import style from './PerfilWalker.module.css'
import foto1 from '../../media/foto1Service.jpg'
import { Link, useParams, useHistory } from 'react-router-dom'
import Nav from './nav/nav';

import FullCalendar, {EventContentArg}  from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import momentPlugin from '@fullcalendar/moment';
import moment from 'moment';





const PerfilWalker = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const Walker = useSelector((state) => state.detailWalker);

  const ordensCliente = useSelector(state => state.ordensCliente)

    var idCliente = localStorage.getItem("userId")

    const[ordenload, setOrdenLoad] = useState(false)




    useEffect(() => {
        dispatch(getPaseadorForId(id))
    }, [dispatch])


    useEffect(() => {
        dispatch(getOrdenCliente(id))
    }, [dispatch])
    // const [file, setFile] = useState('')
    // const handleInputChange = (e) => {
    //     setFile(e.target.files[0])
    // };

    // const handleSubmitImage = (e) => {
    //     e.preventDefault();
    //     if (!file) return;
    //     console.log('file', file)
    //     // upLoadImage(previewSource)
    //     addImage(file)
    // }

    // const handleLogout = (event) => {
    //     event.preventDefault();
    //     history.push("/");
    // };

    useEffect(() => {
        if(ordenload===true){
        dispatch(getOrdenCliente(id))
        }
    }, [ordenload])


    const maxPerrosPorTurno = 4
    

    const handleDateSelect = (selectInfo) => {
        
        
        let today = new Date()
        
        var calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection
    
        
        
        if (selectInfo.start < today){
            calendarApi.unselect()
            return alert('Fecha no permitida');
            
        }
        const cantOrdenes = ordensCliente.filter(ordens=>ordens.start.toString() === selectInfo.startStr.toString() && 
        ordens.end.toString() === selectInfo.endStr.toString())
        
        if (cantOrdenes.length >= maxPerrosPorTurno){
            
           return alert('No hay disponibilidad horaria en este turno')
        }

    
        if (selectInfo.start >= today ) {
            var title = prompt(`Confirma reserva con ${Walker.name}? agregue ubicación` )
          calendarApi.addEvent({ // will render immediately. will call handleEventAdd
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            // allDay: selectInfo.allDay
          }, true) // temporary=true, will get overwritten when reducer gives new events
        }
        console.log(id)
        console.log(idCliente)
        if(title){
        dispatch(clientSendOrden({
            fechaInicio: selectInfo.startStr,
            fechaFinal: selectInfo.endStr,
            userId: id,
            clientId: idCliente,
            ubicacion: title
        }))
        console.log(ordenload)
        setTimeout(() => {
            setOrdenLoad(true)
        }, 1000);
        
        setTimeout(() => {
        setOrdenLoad(false)
        }, 1000);
        
        }
    }

    // const handleEventClick = (clickInfo) => {
    //     console.log(clickInfo)
    //     if ((`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //       clickInfo.event.remove() // will render immediately. will call handleEventRemove
    //     }
    //   }
      const handleEventClick = (clickInfo) => {
        
        if(clickInfo.event.extendedProps.clientId === idCliente){
        clickInfo.event.remove() // will render immediately. will call handleEventRemove
      }
        else  {
          return clickInfo.event.title // will render immediately. will call handleEventRemove
        }
    }
    
    
    
    var mañana = false
    var tarde = false

    return (
        <div className={style.container}>
            <Nav />

            <div className={style.containerPerfil}>
                <div className={style.personalInformation}>
                    <div className={style.borderFoto}>
                        <div className={style.fotoPerfil}>
                            {Walker.image ? <img src={Walker.image} alt='' /> : <img src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg" alt='' />}
                        </div>
                    </div>
                    <div className={style.informacion}>
                        {/* <h2>{Client.name} {Client.surname}</h2> */}
                        <ul >
                            <li className={style.liService}>{Walker.service}</li>
                            <li className={style.libirth}>{Walker.birth_day}</li>
                            <li className={style.liPhone}>{Walker.phone}</li>
                            <li className={style.liEmail}>{Walker.email}</li>
                            <li className={style.liUbication}>{Walker.ubication}</li>
                            <li className={style.liDni}>{Walker.dni}</li>
                        </ul>
                    </div>
                </div>

                <div className={style.caracteristicas}>
                    <div className={style.descripcion}>
                        <h2>Description</h2>
                        <div className={style.textDescription}>
                            {Walker.description ? <p className={style.textDescriptionNew}>{Walker.description}</p> : <p>Agrega una descripcion</p>}
                        </div>
                    </div>
                    <div>
                        <span>🟢 Paseos Confirmados</span> 
                        <span>🟡 Pendientes</span> 
                    </div>
                    <div>

            <FullCalendar eventClassNames={style.calendar} 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
            initialView="timeGridWeek"
            locale = {esLocale}
            editable={true}
            selectable= {true}
            selectMirror={true}
            dayMaxEvents={3}
            select={handleDateSelect}
            eventClick={handleEventClick}   
            contentHeight= "auto"
            slotDuration = '01:00'
            events = {
                ordensCliente
                
            }
            slotMinTime = {tarde ? '13:00:00':'06:00:00' }
            slotMaxTime = {mañana ? '13:00:00': '23:00:00'}
            allDaySlot = {false}
            />
        </div>
                    <div className={style.price}>
                        <h2>Price per Hour</h2>
                        <div className={style.textDescription}>
                            {Walker.price != 0 ? <p>{Walker.price}  x Hour</p> : <p>Ponle un precio a tu servicio</p>}
                        </div>
                    </div>
                    <div className={style.reputacion}>
                        <h2>Reputacion</h2>
                        <div className={style.textDescription}>
                            <p> * * * * *</p>
                        </div>
                    </div>
                    <div className={style.fotos}>
                        <div className={style.fondoFotos}>
                            <h2>Fotos</h2>
                            <div className={style.galeria}>
                                {Walker.images?.map(i =>
                                    <div key={i.public_id}>
                                        <img src={i.imageURL ? i.imageURL : foto1} alt='a' />
                                    </div>)
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PerfilWalker;
