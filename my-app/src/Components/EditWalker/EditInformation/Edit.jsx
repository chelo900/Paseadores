import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { putDetailsUser } from "../../../actions";
import style from "./Edit.module.css";
import { useParams } from "react-router";

const Edit = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const paseador = useSelector((state) => state.detailWalker);
  const [input, setInput] = useState({
    service: paseador.service,
    birth_day: paseador.birth_day,
    phone: paseador.phone,
    email: paseador.email,
    ubication: paseador.ubication,
    dni: paseador.dni,
    image: paseador.image,
  });

  const inputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    history.push(`/walker/perfil/${id}`);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "projectimages");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvmrhxfht/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setInput((values) => ({
      ...values,
      image: file.secure_url,
    }));
  };

  const handlerSubmit = () => {
    console.log(user);
    dispatch(putDetailsUser(input, user));
    alert("Cambios Efectuados");
    history.push(`/walker/perfil/${id}`);
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Información</h1>
        <select
          value={input.service}
          defaultValue={paseador.service}
          name="service"
          onChange={inputChange}
          className={style.select}
        >
          <option>Seleccione Servicio:</option>
          <option value="Walker">Paseador</option>
          <option value="Carer">Cuidador</option>
          <option value="Walker and Carer">Paseador y Cuidador</option>
        </select>
        <input
          type="date"
          name="birth_day"
          // defaultValue={paseador.birth_day}
          value={input.value}
          placeholder={`Fecha de nacimiento : ${paseador.birth_day}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="phone"
          // defaultValue={paseador.phone}
          value={input.value}
          placeholder={`Número de teléfono: ${paseador.phone}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="email"
          // defaultValue={paseador.email}
          value={input.value}
          placeholder={`Email: ${paseador.email}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="ubication"
          // defaultValue={paseador.ubication}
          value={input.value}
          placeholder={paseador.ubication ? paseador.ubication : "Ubicación"}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="dni"
          // defaultValue={paseador.dni}
          value={input.value}
          placeholder={`Número de documento: ${paseador.dni}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <div className={style.selectFile}>
          <label className={style.label}>Seleccionar una imagen de perfil</label>
          <div>
            <input
              type="file"
              name="image"
              onChange={uploadImage}
              className={style.inputImg}
            />
          </div>
        </div>
        <div className={style.containerBtn}>
          <button className={style.volver} onClick={handleLogout}>
            Atrás
          </button>
          <button className={style.edit} type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
