import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { putDetailsUser } from "../../../actions";
import style from "./Edit.module.css";

const Edit = () => {
  const user = useSelector((state) => state.user);
  
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
    history.push(`/walker/perfil/${user.id}`);
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
    dispatch(putDetailsUser(input, user));
    alert("Cambios Efectuados");
    history.push(`/walker/perfil/${user.id}`);
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Informacion</h1>
        <select
          value={input.service}
          defaultValue={paseador.service}
          name="service"
          onChange={inputChange}
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
          placeholder={paseador.birth_day}
          onChange={(e) => inputChange(e)}
        />
        <input
          type="text"
          name="phone"
          // defaultValue={paseador.phone}
          value={input.value}
          placeholder={paseador.phone}
          onChange={(e) => inputChange(e)}
        />
        <input
          type="text"
          name="email"
          // defaultValue={paseador.email}
          value={input.value}
          placeholder={paseador.email}
          onChange={(e) => inputChange(e)}
        />
        <input
          type="text"
          name="ubication"
          // defaultValue={paseador.ubication}
          value={input.value}
          placeholder={paseador.ubication ? paseador.ubication : "Ubicación"}
          onChange={(e) => inputChange(e)}
        />
        <input
          type="text"
          name="dni"
          // defaultValue={paseador.dni}
          value={input.value}
          placeholder={paseador.dni}
          onChange={(e) => inputChange(e)}
        />
        <div className={style.selectFile}>
          <div className={style.selectFile}>
            <label>Selecciona una imagen de perfil</label>
            <input
              type="file"
              name="image"
              className={style.file}
              onChange={uploadImage}
            />
          </div>
        </div>
        <button type="submit">Editar</button>
      </form>
      <br />
      <br />
      <button className={style.volver} onClick={handleLogout}>
        {" "}
        Volver{" "}
      </button>
    </div>
  );
};
export default Edit;
