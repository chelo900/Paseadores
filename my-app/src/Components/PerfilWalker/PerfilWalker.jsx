import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clientSendOrden,
  getOrdenCliente,
  getPaseadorForId,
  ordenAnswer,
  getAssessment,
  getPreferences,
  putDetailsUser,
  deleteImage,
} from "../../actions/index";

import style from "./PerfilWalker.module.css";
import foto1 from "../../media/foto1Service.jpg";
import { Link, useParams, useHistory } from "react-router-dom";

import Nav from "./nav/Nav";
import swal from "sweetalert";
import patitallena from "../../media/patitallena.png";
import patitavacia from "../../media/patitavacia.png";
import chat from "../../media/chat.png";
import mediapatita from "../../media/mediapatita.png";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import dotenv from "dotenv";
import Premium from "../../Premiums/Premium";
import Preferencias from "./Preferencias/Preferencias";
import MapView from "../../ComponentsMaps/MapView";
dotenv.config();

// import Footer from './footer/Footer';

const PerfilWalker = () => {
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const history = useHistory();

  const Walker = useSelector((state) => state.detailWalker);

  const comment = useSelector((state) => state.comment);
  const score = useSelector((state) => state.score);

  const ordensCliente = useSelector((state) => state.ordensCliente);
  const preferencias = useSelector((state) => state.preferencias);
  const [ordenload, setOrdenLoad] = useState(false);
  const [delImage, setDelImage] = useState(false);
  const baseURL = process.env.REACT_APP_API || "http://localhost:3001";

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getPaseadorForId(id, token));
    dispatch(getAssessment(id, token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, delImage]);

  useEffect(() => {
    if (!Walker.latitude || !Walker.longitude) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          dispatch(
            putDetailsUser(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              id,
              token
            )
          );
          dispatch(getPaseadorForId(id, token));
        },
        function (error) {
          console.log(error);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    }
  }, []);

  // useEffect(() => {
  //   if (delImage === true) dispatch(getPaseadorForId(id, token));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdenCliente(id, token));
  }, [dispatch]);

  useEffect(() => {
    if (ordenload === true) {
      dispatch(getOrdenCliente(id, token));
    }
  }, [ordenload]);

  useEffect(() => {
    let ordenespendientes = ordensCliente.filter(
      (ordenes) => ordenes.estadoReserva === "pendiente"
    );
    setTimeout(() => {
      if (ordenespendientes.length !== 0) {
        swal({
          title: "Tenes ordenes pendientes que contestar!",
          info: "info",
        });
      }
    }, 1500);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPreferences(id, token));
  }, [dispatch]);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    let title = prompt(`Confirma reserva con ${Walker.name}`);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          // allDay: selectInfo.allDay
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
    dispatch(
      clientSendOrden(
        {
          fecha: selectInfo.startStr,
          userId: id,
        },
        token
      )
    );
  };

  const handleEventClick = (clickInfo) => {
    swal({
      title: "Confirmar orden de paseo",
      text: `Cliente de la zona de ${clickInfo.event.extendedProps.ubicacion}`,
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({ text: "Orden confirmada", icon: "success" });
        dispatch(
          ordenAnswer(
            {
              id: clickInfo.event.extendedProps.idOrden,
              estadoReserva: "confirmada",
            },
            token
          )
        );
        setTimeout(() => {
          setOrdenLoad(true);
        }, 1000);
        setOrdenLoad(false);
      } else {
        swal({ text: "Orden rechazada", icon: "warning" });
        dispatch(
          ordenAnswer(
            {
              id: clickInfo.event.extendedProps.idOrden,
              estadoReserva: "rechazada",
            },
            token
          )
        );
        setTimeout(() => {
          setOrdenLoad(true);
        }, 1000);
        setOrdenLoad(false);
      }
    });
  };

  const handleDelete = (public_id, token) => {
    swal({
      title: "¿Desea borrar imagen?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
    }).then((respuesta) => {
      if (respuesta) {
        setTimeout(() => {
          setDelImage(true);
        }, 1000);
        swal({ text: "Imagen eliminada", icon: "success" });
        dispatch(deleteImage(public_id, token));
      }
      setTimeout(() => {
        setDelImage(false);
      }, 1000);
    });
  };

  return (
    <div className={style.container}>
      <Nav />
      <div className={style.containerPerfil}>
        <div className={style.personalInformation}>
          <div className={style.borderFoto}>
            <div className={style.fotoPerfil}>
              {Walker.image ? (
                <img src={Walker.image} alt="" />
              ) : (
                <img
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className={style.informacion}>
            <h2>
              {Walker.name} {Walker.surname}
            </h2>
            {Walker.status === "active" ? (
              <p className={style.activo}>Disponible</p>
            ) : (
              ""
            )}
            {Walker.status === "inactive" ? (
              <p className={style.noactivo}>No disponible</p>
            ) : (
              ""
            )}
            <ul>
              <li className={style.liService}>{Walker.service}</li>
              <li className={style.libirth}>{Walker.birth_day}</li>
              <li className={style.liPhone}>{Walker.phone}</li>
              <li className={style.liEmail}>{Walker.email}</li>
              <li className={style.liDni}>{Walker.dni}</li>
              <li className={style.liUbication}>{Walker.ubication}</li>
            </ul>
            <Link
              to={`/walker/editInformation/${id}`}
              className={style.editContainerInfo}
            >
              <button className={style.edit}>Editar Informacion</button>
            </Link>
          </div>
          <div className={style.preferencias}>
            <Preferencias preferencias={preferencias} />
            <Link to={`/walker/editpreferencias/${id}`}>
              <button className={style.edit}>Editar preferencias</button>
            </Link>
          </div>
          <MapView
            className={style.map}
            latitude={Walker.latitude}
            longitude={Walker.longitude}
            name={Walker.name}
            surname={Walker.surname}
          />
        </div>
        <div className={style.caracteristicas}>
          <div className={style.Premuim}>
            <Premium />
          </div>
          <div className={style.descripcion}>
            <h2>Descripcion:</h2>
            <div className={style.textDescription}>
              {Walker.description ? (
                <p className={style.textDescriptionNew}>{Walker.description}</p>
              ) : (
                <p>Agrega una descripcion</p>
              )}
            </div>
            <Link
              to={`/walker/editDescription/${id}`}
              className={style.editContainer}
            >
              <button className={style.editDescription}>
                <span class="material-icons-outlined">edit</span>
              </button>
            </Link>
          </div>
          <div className={style.price}>
            <h2>Precio por Hora:</h2>
            <div className={style.textDescription}>
              {Walker.price != 0 ? (
                <p>${Walker.price}</p>
              ) : (
                <p>Ponle un precio a tu servicio</p>
              )}
            </div>
            <Link
              to={`/walker/editPrice/${id}`}
              className={style.editContainer}
            >
              <button className={style.editDescription}>
                <span class="material-icons-outlined">edit</span>
              </button>
            </Link>
          </div>
          <div className={style.reputacion}>
            <h2>Reputación:</h2>
            <div className={style.textDescriptionReputacion}>
              <h1>{score?.toFixed(1)}</h1>
              <img src={patitallena} alt="" />
              {score < 1 && <img src={patitavacia} alt="sas" />}
              {score > 1 && score < 2 && <img src={mediapatita} alt="" />}
              {score >= 2 && <img src={patitallena} alt="" />}
              {score < 2 && <img src={patitavacia} alt="sas" />}
              {score > 2 && score < 3 && <img src={mediapatita} alt="" />}
              {score >= 3 && <img src={patitallena} alt="" />}
              {score < 3 && <img src={patitavacia} alt="sas" />}
              {score > 3 && score < 4 && <img src={mediapatita} alt="" />}
              {score >= 4 && <img src={patitallena} alt="" />}
              {score < 4 && <img src={patitavacia} alt="sas" />}
              {score > 4 && score < 5 && <img src={mediapatita} alt="" />}
              {score === 5 && <img src={patitallena} alt="" />}
              {score < 5 && <img src={patitavacia} alt="sas" />}
            </div>
            <h2>Comentarios:</h2>
            {comment?.length &&
              comment.map((el) => (
                <div>
                  <p> {el}</p>
                </div>
              ))}
          </div>
          <div className={style.fotos}>
            <div className={style.fondoFotos}>
              <h2>Fotos</h2>
              <div className={style.galeria}>
                {Walker.images?.map((i) => (
                  <div key={i.public_id}>
                    <img src={i.imageURL ? i.imageURL : foto1} alt="a" />
                    <button
                      onClick={() => handleDelete(i.public_id, token)}
                      className="p"
                      className="btn"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              <form
                action={`${baseURL}/postimages/${id}`}
                method="POST"
                encType="multipart/form-data"
              >
                <input type="file" name="image" />
                <button className={style.subir} type="submit">
                  Subir
                </button>
              </form>
              <Link to={`/chat`} className={style.editContainerInfo}>
                <button className={style.editDescription}>CHAT ROOMS</button>
              </Link>
              <Link to={`/messenger`} className={style.editContainerInfo}>
                <button className={style.editDescription}>CHAT</button>
              </Link>
            </div>
            <div>
              <div>
                <span>🟢 Paseos Confirmados</span>
                <span>🟡 Pendientes</span>
              </div>
              <FullCalendar
                eventClassNames={style.calendar}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
                slotDuration={preferencias.duracion_paseos || "03:00:00"}
                events={ordensCliente}
                slotMinTime={preferencias.comienzo_jornada || "08:00:00"}
                slotMaxTime={preferencias.fin_jornada || "23:00:00"}
                allDaySlot={false}
                weekends={preferencias.dias_trabajo === "LV" ? false : true}
                hiddenDays={
                  preferencias.dias_trabajo === "W" ? [1, 2, 3, 4, 5] : []
                }
              />
            </div>
            <FullCalendar
              eventClassNames={style.calendar}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              initialView="timeGridWeek"
              locale={esLocale}
              editable={true}
              selectable={false}
              selectMirror={false}
              dayMaxEvents={true}
              // select={handleDateSelect}
              eventClick={handleEventClick}
              contentHeight="auto"
              slotDuration={preferencias.duracion_paseos || "03:00:00"}
              events={ordensCliente}
              slotMinTime={preferencias.comienzo_jornada || "08:00:00"}
              slotMaxTime={preferencias.fin_jornada || "23:00:00"}
              allDaySlot={false}
              weekends={preferencias.dias_trabajo === "LV" ? false : true}
              hiddenDays={
                preferencias.dias_trabajo === "W" ? [1, 2, 3, 4, 5] : []
              }
            />
          </div>
        </div>
        <div className={style.padding}>
          <FullCalendar
            className={style.calendario}
            plugins={[listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
            }}
            initialView="listWeek"
            events={ordensCliente}
            locale={esLocale}
          />
        </div>
      </div>
      <Link to={`/chat`} className={style.editContainerChat}>
        <button className={style.editchat}>
          <img src={chat} alt="chat" title="Conectar" />
        </button>
      </Link>
    </div>
  );
};
export default PerfilWalker;
