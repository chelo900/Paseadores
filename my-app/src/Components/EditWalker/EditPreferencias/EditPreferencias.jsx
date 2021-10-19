import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { putDetailsUser, putPreferencias, sendPreferencias } from "../../../actions";
import style from "./EditPreferencias.module.css";
import swal from "sweetalert";
import axios from "axios";

function EditPreferencias() {
  const token = localStorage.getItem("userToken");
  const id = localStorage.getItem("userId");

  const { userId } = useParams();

  const dispatch = useDispatch();

  const preferencias = useSelector((state) => state.preferencias);

  const history = useHistory();

  useEffect(() => {
    if(!token){
      history.push(`/login`);
    }
   
  }, []);

  const [newPreferencias, setNewPreferencias] = useState({
    turno: '',
    // (newPreferencias.comienzo_jornada > '6' && newPreferencias.fin_jornada <= '13') ? "Mañana" : 
    // (newPreferencias.comienzo_jornada >= '13' && newPreferencias.fin_jornada < 23) ? "Tarde/Noche" : "Full"  ,
    dias_trabajo: preferencias.dias_trabajo,
    perros_por_paseo: preferencias.perros_por_paseo,
    duracion_paseos: preferencias.duracion_paseos,
    comienzo_jornada: preferencias.comienzo_jornada,
    fin_jornada: preferencias.fin_jornada,
    userId: userId,
  });

  const provincias= ["Buenos Aires","Capital Federal","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja",
    "Mendoza","Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"]
  
  const [municipios, setMunicipios] = useState([])
  const [localidad, setLocalidad] = useState([])
  const [ubicacion, setUbicacion] = useState({
    provincia:'',
    municipio: '',
    localidad: ''
  })

  const handleProvincias = async (e)=>{
    setUbicacion({
      ...ubicacion,
      provincia:e.target.value})
    if(e.target.value === "Buenos Aires"){
      let munis =await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${e.target.value}&orden=nombre&max=135`)
      munis = munis.data.municipios.map(mun=>mun.nombre)
      setMunicipios(munis)
    } else{ 
      let munis = await axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${e.target.value}&orden=nombre&max=200`)
      munis = munis.data.departamentos.map(dep=>dep.nombre)
      setMunicipios(munis)
    }
  }

  const handleMunicipios = async (e)=>{
    setUbicacion({
      ...ubicacion,
      municipio: e.target.value})
    let localidad = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${ubicacion.provincia}&departamento=${e.target.value}&orden=nombre&max=50`)
    localidad = localidad.data.localidades.map(local=>local.nombre)
    setLocalidad(localidad)
  }

  const handleLocalidades = (e) =>{
    setUbicacion({
      ...ubicacion,
      localidad: e.target.value})
  }

  const handleHours = (e) => {
    setNewPreferencias({
      ...newPreferencias,
      duracion_paseos: e.target.value,
    });
  };

  function handleTurnos() {
    setNewPreferencias({
      ...newPreferencias,
      turno:
      (parseInt(newPreferencias.comienzo_jornada) >= 6 && parseInt(newPreferencias.fin_jornada) <= 13) ? "Mañana" :
      (parseInt(newPreferencias.comienzo_jornada) >= 13 && parseInt(newPreferencias.fin_jornada) <= 23) ? "Tarde/Noche" : "Full" 
    });
  };

  const handleDias = (e) => {
    setNewPreferencias({
      ...newPreferencias,
      dias_trabajo: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (preferencias?.length !== 0) {
      dispatch(putPreferencias(userId, newPreferencias, token));
    }
    if (preferencias?.length === 0)
      dispatch(sendPreferencias(newPreferencias, token));
    swal({ title: "Tus preferencias fueron actualizados", icon: "info" });

    dispatch(putDetailsUser({ ubication:`${ubicacion.provincia},${ubicacion.municipio},${ubicacion.localidad}`}, id, token));


    setTimeout(() => {
      history.push(`/walker/perfil/${userId}`);
    }, 1500);
  };

  const[array, setArray] = useState([])

  let finish = 23
  let comienzo = ['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
  comienzo.length = (comienzo.length - newPreferencias.duracion_paseos) || comienzo.length - 1 

  const final = []

  function handleSelect(e){
    setNewPreferencias({
      ...newPreferencias,
      comienzo_jornada: e.target.value, /*+ ":00:00",*/
      
    })
  }

  function finJornada(){
    
    if(newPreferencias.comienzo_jornada && newPreferencias.duracion_paseos)
    for (let i = parseInt(newPreferencias.comienzo_jornada) + parseInt (newPreferencias.duracion_paseos) ; i <= finish; i+= parseInt( newPreferencias.duracion_paseos)) {
      final.push(i)
    }
    console.log(final)
    setArray(final)
    handleTurnos()
    return final
  }

  useEffect(() => {
   finJornada()
  }, [newPreferencias.comienzo_jornada, newPreferencias.duracion_paseos])

  useEffect(() => {
    handleTurnos()
   
  },[newPreferencias.comienzo_jornada, newPreferencias.fin_jornada])

  return (
    <div className={style.tt}>
      <form className={style.total} onSubmit={(e) => handleSubmit(e)}>
        <h1 className={style.title}>Completa tus preferencias de trabajo</h1>
        <h2 className={style.title}>Así tus clientes te encuentran más fácil</h2>
        <div className={style.form}>
          <div className={style.izquierda}>
            <div className={style.container}>
              <label className={style.label}>
                Duración de los Paseos
                <select 
                  className={style.select}
                  onChange={(e) => handleHours(e)}
                >
                  <option value=""> Horas de paseo</option>
                  <option value="01"> 1 hora</option>
                  <option value="02">2 horas</option>
                  <option value="03">3 horas</option>
                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                Cantidad de Perros por Paseo
                <select   onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      perros_por_paseo: e.target.value,
                    })
                  }>
                  <option value="">Cantidad de Perros</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>

                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                Elegí tus días de trabajo
                <select
                  className={style.select}
                  onChange={(e) => handleDias(e)}
                >
                  <option value=""> Dias de trabajo</option>
                  <option value="LD"> Lunes a Domingo</option>
                  <option value="LV">Lunes a Viernes</option>
                  <option value="W">Sabados y Domingos</option>
                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                Hora de comienzo jornada laboral:
                <select onChange={(e) =>
                   handleSelect(e)
                  }>
                    <option id='Hora Inicio'  selected  value=''>Hora Inicio</option>
                    {
                      comienzo && comienzo.map(comienzo=>(
                        <option value={comienzo}>{comienzo}</option>
                      ))
                    }
                </select>
              </label>
            </div>
          </div>
          <div className={style.derecha}>
            <div className={style.container}>
              <label className={style.label}>
                Hora final de joranda laboral:
                <select onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      fin_jornada: e.target.value  ,
                    })
                  }>
                    <option unselectable value="">Hora Final</option>
                  {
                    array && array.map(hora=>(
                      <option value={hora}>{hora}</option>
                    )
                    )
                  }
                </select>
              </label>
            </div>
          </div>
          <div className={style.container}>
              <label className={style.label}>
                Elegí tu Provincia
       
                <select   onChange={(e) =>
                    handleProvincias(e)
                  }>
                  <option value="">Provincia</option>
                  {
                    provincias.map(prov=>(
                      <option value={prov}>{prov}</option>
                    ))
                  }

                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                  Elegí Municipio/Departamento
                <select   onChange={(e) =>
                    handleMunicipios(e)
                  }>
                  <option value="">Municipios/Departamentos</option>
                  {
                    municipios && municipios.map(munis=>(
                      <option value={munis}>{munis}</option>
                    ))
                  }

                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                  Elegí Localidad
                <select   onChange={(e) =>
                    handleLocalidades(e)
                  }>
                  <option value="">Localidad</option>
                  {
                    localidad && localidad.map(local=>(
                      <option value={local}>{local}</option>
                    ))
                  }

                </select>
              </label>
            </div>
        </div>
        <div className={style.containerBtn}>
          <button className={style.btn} type="submit">
            {" "}
            Enviar Preferencias{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPreferencias;
