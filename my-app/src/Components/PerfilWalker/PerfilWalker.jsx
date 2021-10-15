import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addImage, clientSendOrden, getOrden, getOrdenCliente, getOrdenPaseador, getPaseadorForId, getPreferences, ordenAnswer } from '../../actions/index'

import style from './PerfilWalker.module.css'
import foto1 from '../../media/foto1Service.jpg'
import { Link, useParams, useHistory } from 'react-router-dom'
import Nav from './nav/Nav';
import swal from 'sweetalert';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin, { ListView } from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import dotenv from "dotenv";
import Preferencias from './Preferencias/Preferencias';
dotenv.config();




// import Footer from './footer/Footer';

const PerfilWalker = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const Walker = useSelector((state) => state.detailWalker);

    const ordensCliente = useSelector(state => state.ordensCliente)

    const preferencias = useSelector(state => state.preferencias)

    const [ordenload, setOrdenLoad] = useState(false)


    const baseURL = process.env.REACT_APP_API || "http://localhost:3001";


    useEffect(() => {
        dispatch(getPaseadorForId(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getOrdenCliente(id))

    }, [dispatch])

    useEffect(() => {
        if (ordenload === true) {
            dispatch(getOrdenCliente(id))
        }
    }, [ordenload])



    useEffect(() => {
        let ordenespendientes = ordensCliente.filter(ordenes => ordenes.estadoReserva === 'pendiente')
        setTimeout(() => {
            if (ordenespendientes.length !== 0) {
                swal({title:'Tenes ordenes pendientes que contestar!',
                        info: "info"})
            }
        }, 1500)

    }, [dispatch])

    useEffect(() => {
       dispatch(getPreferences(id))
    }, [dispatch])



    const handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar
        let title = prompt(`Confirma reserva con ${Walker.name}`)

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({ // will render immediately. will call handleEventAdd
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                // allDay: selectInfo.allDay
            }, true) // temporary=true, will get overwritten when reducer gives new events
        }
        dispatch(clientSendOrden({
            fecha: selectInfo.startStr,
            userId: id,
        }))
    }



    // const handleEventClick = (clickInfo) => {
    //     dispatch(ordenAnswer({
    //         title: clickInfo.event.title
    //     })) 
    //     console.log(clickInfo.event.title)
    //     if (prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //       clickInfo.event.remove() // will render immediately. will call handleEventRemove
    //     }

    // }

    const handleEventClick = (clickInfo) => {
        const confirm = () => {
            swal({
                title: 'Confirmar orden de paseo',
                text: `Cliente de la zona de ${clickInfo.event.extendedProps.ubicacion}`,
                icon: "info",
                buttons: ["Cancelar", "Aceptar"],

            }).then(respuesta => {
                if (respuesta) {
                    swal({ text: 'Orden confirmada', icon: 'success' });
                    dispatch(ordenAnswer({
                        id: clickInfo.event.extendedProps.idOrden,
                        estadoReserva: "confirmada"
                    }));
                    setTimeout(() => {
                        setOrdenLoad(true)
                    }, 1000);
                    setOrdenLoad(false)
                } else {
                    swal({ text: 'Orden rechazada', icon: 'warning' });
                    dispatch(ordenAnswer({
                        id: clickInfo.event.extendedProps.idOrden,
                        estadoReserva: "rechazada"
                    }));
                    setTimeout(() => {
                        setOrdenLoad(true)
                    }, 1000);
                    setOrdenLoad(false)
                }
            })
        }
        if (clickInfo.event.extendedProps.estadoReserva === 'pendiente') {
            // console.log(clickInfo.event.extendedProps.idOrden)
            confirm(`Confirmar la orden? ubicacion: ${clickInfo.event.extendedProps.ubicacion}`)
            // dispatch(ordenAnswer({
            //     id: clickInfo.event.extendedProps.idOrden
            // }))
            // setTimeout(() => {
            //     setOrdenLoad(true)
            // }, 1000); 
            // setOrdenLoad(false)
            // console.log(ordenload)
        }

        else {
            return clickInfo.event.title // will render immediately. will call handleEventRemove
        }

    }


    return (
        <div className={style.container} className={style.body}>
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
                        <Link to={`/walker/editInformation/${id}`} className={style.editContainerInfo}>
                            <button className={style.editDescription}>Editar Informacion</button>
                        </Link>
                    </div>
                    <Preferencias preferencias={preferencias}/>
                        <Link to={`/walker/editpreferencias/${id}`}>
                           <button>Editar preferencias</button> 
                        </Link>
                </div>

                <div className={style.caracteristicas}>
                    <div className={style.Premuim} >
                        <Link to="/premium">
                            <button className={style.btnPremuim} type="submit">Hacerme premium</button>
                        </Link>
                    </div>
                    <div className={style.descripcion}>
                        <h2>Description</h2>
                        <div className={style.textDescription}>
                            {Walker.description ? <p className={style.textDescriptionNew}>{Walker.description}</p> : <p>Agrega una descripcion</p>}
                        </div>
                        <Link to={`/walker/editDescription/${id}`} className={style.editContainer}>
                            <button className={style.editDescription}>Editar Descripcion</button>
                        </Link>
                    </div>
                    <div className={style.price}>
                        <h2>Price per Hour</h2>
                        <div className={style.textDescription}>
                            {Walker.price != 0 ? <p>{Walker.price}  x Hour</p> : <p>Ponle un precio a tu servicio</p>}
                        </div>
                        <Link to={`/walker/editPrice/${id}`} className={style.editContainer}>
                            <button className={style.edit}>Editar Precio</button>
                        </Link>
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
                                {

                                Walker.images?.map(i =>
                                    <div key={i.public_id}>
                                        <img src={i.imageURL ? i.imageURL : foto1} alt='a' />
                                    </div>)
                                }
                            </div>
                            
                            <form action={`${baseURL}/postimages/${id}`} method="POST" encType="multipart/form-data">
                                <input type="file" name="image" />
                                <button className={style.subir} type="submit">Subir</button>
                            </form> 
                            
                        </div>
                        <div>
                            <span>🟢 Paseos Confirmados</span>
                            <span>🟡 Pendientes</span>
                        </div>
                        <FullCalendar eventClassNames={style.calendar}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            initialView="timeGridWeek"
                            locale={esLocale}
                            editable={true}
                            selectable={false}
                            selectMirror={false}
                            dayMaxEvents={true}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            contentHeight="auto"
                            slotDuration= {preferencias.duracion_paseos || '01:00:00'}
                            events={ordensCliente}
                            slotMinTime= {preferencias.comienzo_jornada || '06:00:00'}
                            slotMaxTime={preferencias.fin_jornada || '23:00:00'}
                            allDaySlot={false}
                            weekends= {preferencias.dias_trabajo === "LV" ? false : true}
                            hiddenDays={preferencias.dias_trabajo === "W" ? [1,2,3,4,5] : []}
                        />
                    </div>
                </div>
                {/* <div>
                    <FullCalendar
                    plugins={[listPlugin]}
                    headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                            }}
                    initialView="listWeek"
                    events={ordensCliente}
                    locale={esLocale}
                    />
                </div> */}
            </div>
            {/* <Footer /> */}
        </div>
    )
}
export default PerfilWalker;
