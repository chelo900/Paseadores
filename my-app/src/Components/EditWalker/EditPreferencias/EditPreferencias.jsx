import React, { useState } from "react";
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
    turno: preferencias.turno,
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

  const handleTurnos = (e) => {
    setNewPreferencias({
      ...newPreferencias,
      turno: e.target.value,
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

  return (
    <div className={style.tt}>
      <form className={style.total} onSubmit={(e) => handleSubmit(e)}>
        <h1 className={style.title}>Elegí tus preferencias de trabajo</h1>
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
                  <option value="01:00:00"> 1 hora</option>
                  <option value="02:00:00">2 horas</option>
                  <option value="03:00:00">3 horas</option>
                </select>
              </label>
            </div>
            <div className={style.container}>
              <label className={style.label}>
                Cantidad de Perros por Paseo
                <input
                  name="perros_por_paseo"
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      perros_por_paseo: e.target.value,
                    })
                  }
                  placeholder="7,8,9"
                />
              </label>
            </div>
            <div className={style.container}>
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
                <input
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      comienzo_jornada: e.target.value + ":00:00",
                    })
                  }
                  placeholder="06,07,08"
                />
              </label>
            </div>
          </div>
          <div className={style.derecha}>
            <div className={style.container}>
              <label className={style.label}>
                Hora final de joranda laboral:
                <input
                  onChange={(e) =>
                    setNewPreferencias({
                      ...newPreferencias,
                      fin_jornada: e.target.value + ":00:00",
                    })
                  }
                  placeholder="21,22"
                />
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
