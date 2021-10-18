import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { putPreferencias, sendPreferencias } from "../../../actions";
import style from "./EditPreferencias.module.css";
import swal from "sweetalert";

function EditPreferencias() {
  const token = localStorage.getItem("userToken");

  const { userId } = useParams();

  const dispatch = useDispatch();

  const preferencias = useSelector((state) => state.preferencias);

  const history = useHistory();

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
                {/* <input
                  name="perros_por_paseo"
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      perros_por_paseo: e.target.value,
                    })
                  }
                  placeholder="7,8,9"
                /> */}
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
            {/* <div className={style.container}>
              <label className={style.label}>
                Elegí en que momento del día trabajas
                <select
                  className={style.select}
                  onChange={(e) => handleTurnos(e)}
                >
                  <option name=""> Turno</option>
                  <option value="Full"> Todo el día</option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde/Noche">Tarde/Noche</option>
                </select>
              </label>
            </div> */}
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
                {/* <input
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      comienzo_jornada: e.target.value + ":00:00",
                    })
                  }
                  placeholder="06,07,08"
                /> */}
                <select      onChange={(e) =>
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
                {/* <input
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      fin_jornada: e.target.value + ":00:00",
                    })
                  }
                  placeholder="21,22"
                /> */}
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
