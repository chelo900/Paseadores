import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  clientSendOrden,
  getOrdenCliente,
  getPaseadorForId,
  postAssessment,
  getAssessment,
  getPreferences,
  putDetailsCliente,
} from "../../actions/index";

import style from "./PerfilWalker.module.css";
import foto1 from "../../media/foto1Service.jpg";
import { Link, useParams, useHistory } from "react-router-dom";
import Chat from "../Chat/Chat";
import Nav from "./nav/Nav";

import chat from '../../media/chat.png'

import FullCalendar, { EventContentArg } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import Swal from "sweetalert2";
import patitallena from "../../media/patitallena.png";
import patitavacia from "../../media/patitavacia.png";
import mediapatita from "../../media/mediapatita.png";
import swal from "sweetalert";
import axios from "axios";
import MapView from "../../ComponentsMaps/MapView";

import favorito from "../../media/favorito.png";
import media from "../../media/media.png";
import estrella from "../../media/estrella.png";

const PerfilWalker = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const history = useHistory();

  const Walker = useSelector((state) => state.detailWalker);
  const comment = useSelector((state) => state.comment);
  const score = useSelector((state) => state.score);

  const ordensCliente = useSelector((state) => state.ordensCliente);
  const preferencias = useSelector((state) => state.preferencias);
  var idClient = localStorage.getItem("userId");

  const [ordenload, setOrdenLoad] = useState(false);

  const [input, setInput] = useState({
    score: 0,
    comment: "",
  });

  const inputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!token) {
      history.push(`/login`);
    }
    dispatch(getPaseadorForId(id, token));
    dispatch(getAssessment(id, token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdenCliente(id, token));
  }, [dispatch]);
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
    if (ordenload === true) {
      dispatch(getOrdenCliente(id, token));
    }
  }, [ordenload]);

  useEffect(() => {
    dispatch(getPreferences(id, token));
  }, [dispatch]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      postAssessment({ ...input, idUser: id, idClient: idClient })
    );
    dispatch(getAssessment(id, token));
    //dispatch(putDetailsProfileCliente(id, input))

    Swal.fire({
      icon: "success",
      title: "Tu valoración fue enviada",
      showConfirmButton: false,
      timer: 1500,
    });

    // history.push(`/Cliente/${id}`)
  };

  async function estrella(e, number) {
    setInput({
      ...input,
      score: number,
    });
  }

  const provincias = [
    "Buenos Aires",
    "Capital Federal",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ];
  // const [municipios, setMunicipios] = useState([])
  const [provincia, setProvincia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [localidad, setLocalidad] = useState("");

  const handleDateSelect = async (selectInfo) => {
    let today = new Date();
    console.log(selectInfo);
    var calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection

    if (selectInfo.start < today) {
      calendarApi.unselect();
      return swal({
        title: "Fecha no permitida, ingresa una fecha válida",
        icon: "warning",
      });
    }
    const cantOrdenes = ordensCliente.filter(
      (ordens) =>
        ordens.start.toString() === selectInfo.startStr.toString() &&
        ordens.end.toString() === selectInfo.endStr.toString()
    );

    if (cantOrdenes.length >= preferencias.perros_por_paseo) {
      return alert("No hay disponibilidad horaria en este turno");
    }

    if (selectInfo.start >= today) {
      let date = selectInfo.start;
      let horaInicio = selectInfo.startStr.slice(11, -9);
      let horaFinal = selectInfo.endStr.slice(11, -9);
      date =
        date.toLocaleDateString(undefined, { day: "2-digit" }) +
        " " +
        date.toLocaleDateString(undefined, { month: "long" }) +
        " " +
        date.toLocaleDateString(undefined, { year: "numeric" });
      Swal.fire({
        text: `Estás solicitando un paseo con ${Walker.name} ${Walker.surname},
      para el ${date} desde las ${horaInicio} hasta ${horaFinal} h.`,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((respuesta) => {
        if (respuesta.value) {
          Swal.fire({
            title: "Por favor ingresa tu ubicación",
            input: "select",
            inputOptions: provincias,
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const provin = Swal.getInput();
              console.log(provin.value);
              if (!provin) {
                Swal.showValidationMessage(`Please enter login and password`);
              }
              setProvincia(provincias[provin.value]);
              if (provincias[provin.value] == "Buenos Aires") {
                axios
                  .get(
                    `https://apis.datos.gob.ar/georef/api/municipios?provincia=${
                      provincias[provin.value]
                    }&orden=nombre&max=135`
                  )
                  .then((munis) => {
                    console.log(munis);
                    let m = munis.data.municipios.map((mun) => mun.nombre);
                    // setMunicipios(m)
                    console.log(m);
                    // setMunicipios(m)
                    // handleMunicipios(m)
                    Swal.fire({
                      title: "Por favor ingresa tu Municipio",
                      input: "select",
                      inputOptions: m,
                      preConfirm: () => {
                        const muni = Swal.getInput();
                        setMunicipio(m[muni.value]);
                        // console.log(muni.value)
                        // console.log(m[muni.value])
                        axios
                          .get(
                            `https://apis.datos.gob.ar/georef/api/localidades?provincia=${
                              provincias[provin.value]
                            }&departamento=${m[muni.value]}&orden=nombre&max=50`
                          )
                          .then((local) => {
                            console.log(local);
                            let l = local.data.localidades.map(
                              (local) => local.nombre
                            );
                            console.log(l);
                            Swal.fire({
                              title: "Por favor ingresa tu Localidad",
                              input: "select",
                              inputOptions: l,
                              preConfirm: () => {
                                const local = Swal.getInput();
                                setLocalidad(l[local.value]);
                                console.log(l[local.value]);

                                dispatch(
                                  clientSendOrden({
                                    fechaInicio: selectInfo.startStr,
                                    fechaFinal: selectInfo.endStr,
                                    userId: id,
                                    clientId: idClient,
                                    ubicacion: `${provincias[provin.value]}, ${
                                      m[muni.value]
                                    }, ${l[local.value]}`,
                                  })
                                );
                                setTimeout(() => {
                                  setOrdenLoad(true);
                                }, 1000);

                                setTimeout(() => {
                                  setOrdenLoad(false);
                                }, 1000);
                              },
                            });
                          });
                      },
                    });
                  });
              } else {
                axios
                  .get(
                    `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${
                      provincias[provin.value]
                    }&orden=nombre&max=200`
                  )
                  .then((depas) => {
                    console.log(depas);
                    let d = depas.data.departamentos.map((dep) => dep.nombre);
                    console.log(d);
                    // setMunicipios(m)
                    // handleMunicipios(d)
                    Swal.fire({
                      title: "Por favor ingresa tu Departamento/Comuna",
                      input: "select",
                      inputOptions: d,
                      preConfirm: () => {
                        const deptos = Swal.getInput();
                        setMunicipio(d[deptos.value]);
                        axios
                          .get(
                            `https://apis.datos.gob.ar/georef/api/localidades?provincia=${
                              provincias[provin.value]
                            }&departamento=${
                              d[deptos.value]
                            }&orden=nombre&max=50`
                          )
                          .then((local) => {
                            let l = local.data.localidades.map(
                              (local) => local.nombre
                            );
                            Swal.fire({
                              title: "Por favor ingresa tu Localidad",
                              input: "select",
                              inputOptions: l,
                              preConfirm: () => {
                                const local = Swal.getInput();
                                setLocalidad(l[local.value]);
                                console.log(l[local.value]);
                                dispatch(
                                  clientSendOrden({
                                    fechaInicio: selectInfo.startStr,
                                    fechaFinal: selectInfo.endStr,
                                    userId: id,
                                    clientId: idClient,
                                    ubicacion: `${provincias[provin.value]}, ${
                                      d[deptos.value]
                                    }, ${l[local.value]}`,
                                  })
                                );
                                setTimeout(() => {
                                  setOrdenLoad(true);
                                }, 1000);
                                setTimeout(() => {
                                  setOrdenLoad(false);
                                }, 1000);
                              },
                            });
                          });
                      },
                    });
                  });
              }
            },
          });
        } else {
          calendarApi.unselect();
          Swal.fire({
            title: "Orden no enviada",
            icon: "info",
          });
        }
      });
    }
  };
  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.clientId === idClient) {
      clickInfo.event.remove(); // will render immediately. will call handleEventRemove
    } else {
      return clickInfo.event.title; // will render immediately. will call handleEventRemove
    }
  };

  // useEffect(() => {
  // }, [ubicacion.provincia,ubicacion.municipio,ubicacion.localidad ])

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
            {Walker.status === "removed" ? (
              <p className={style.noactivo}>Este usuario ya no existe</p>
            ) : (
              ""
            )}
            <ul>
              <li className={style.liService}>{Walker.service}</li>
              <li className={style.libirth}>{Walker.birth_day}</li>
              <li className={style.liUbication}>{Walker.ubication}</li>
              <li className={style.liRep}>Score: {score?.toFixed(1)}</li>
            </ul>
          </div>
        </div>
        <div className={style.caracteristicas}>
          <div className={style.descripcionWalker}>
            <h2>Descripción</h2>
            <div className={style.textDescription}>
              {Walker.description ? (
                <p className={style.textDescriptionNew}>{Walker.description}</p>
              ) : (
                <p>Descripcion no disponilbe</p>
              )}
            </div>
          </div>
          <div className={style.price}>
            <h2>Precio</h2>
            <div className={style.textDescription}>
              {Walker.price != 0 ? (
                <p>{Walker.price} x Hour</p>
              ) : (
                <p>Precio no disponible</p>
              )}
            </div>
          </div>
          <div className={style.reputacion}>
            <h2>Deja tu opinon:</h2>
           <div className={style.opinion}>
            {comment?.length
                ? comment.map((el) => (
                    <div>
                      <p> {el}</p>
                    </div>
                  ))
                : ""}

              <button
                className={style.prueba}
                onClick={(e) => {
                  estrella(e, 1);
                }}
              >
                {input.score > 0 ? (
                  <img src={patitallena} alt="" />
                ) : (
                  <img src={patitavacia} alt="sas" />
                )}
              </button>
              <button
                className={style.prueba}
                onClick={(e) => {
                  estrella(e, 2);
                }}
              >
                {input.score > 1 ? (
                  <img src={patitallena} alt="" />
                ) : (
                  <img src={patitavacia} alt="sas" />
                )}
              </button>
              <button
                className={style.prueba}
                onClick={(e) => {
                  estrella(e, 3);
                }}
              >
                {input.score > 2 ? (
                  <img src={patitallena} alt="" />
                ) : (
                  <img src={patitavacia} alt="sas" />
                )}
              </button>
              <button
                className={style.prueba}
                onClick={(e) => {
                  estrella(e, 4);
                }}
              >
                {input.score > 3 ? (
                  <img src={patitallena} alt="" />
                ) : (
                  <img src={patitavacia} alt="sas" />
                )}
              </button>
              <button
                className={style.prueba}
                onClick={(e) => {
                  estrella(e, 5);
                }}
              >
                {input.score > 4 ? (
                  <img src={patitallena} alt="" />
                ) : (
                  <img src={patitavacia} alt="sas" />
                )}
              </button>
           </div>

            <form className={style.formulario} onSubmit={handlerSubmit}>
              <textarea
                type="text"
                name="comment"
                value={input.comment}
                placeholder="Dejar un comentario..."
                onChange={(e) => inputChange(e)}
              />
              <div className={style.formularioButton}>
                <button className={style.edit} type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
          <div className={style.fotos}>
            <div className={style.fondoFotos}>
              <h2>Fotos</h2>
              <div className={style.galeria}>
                {Walker.images?.map((i) => (
                  <div key={i.public_id}>
                    <img src={i.imageURL ? i.imageURL : foto1} alt="a" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={style.padding}>
          <h2>Solicita un Turno:</h2>
          <div >
              <span>🟢 Paseos Confirmados</span>
              <span>🟡 Pendientes</span>
            </div> 
            <div>
              <FullCalendar
                eventClassNames={style.calendar}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="timeGridWeek"
                locale={esLocale}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={3}
                select={handleDateSelect}
                eventClick={handleEventClick}
                contentHeight="auto"
                slotDuration={preferencias.duracion_paseos || "01:00:00"}
                events={ordensCliente}
                slotMinTime={preferencias.comienzo_jornada || "06:00:00"}
                slotMaxTime={preferencias.fin_jornada || "23:00:00"}
                allDaySlot={false}
                weekends={preferencias.dias_trabajo === "LV" ? false : true}
                hiddenDays={
                  preferencias.dias_trabajo === "W" ? [1, 2, 3, 4, 5] : []
                }
              />
            </div> 
        </div>
      </div>
      
      <Link
              to={`/chat`}
              className={style.editContainerChat}
            >
              <button className={style.editchat}>
                <img src={chat} alt='chat' title="Conectar" />
              </button >
            </Link>
    </div>
  );
};
export default PerfilWalker;
