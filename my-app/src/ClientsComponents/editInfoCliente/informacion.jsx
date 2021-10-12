import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { putDetailsCliente } from "../../actions";
import style from "./informacion.module.css";

const Edit = () => {

  const user = useSelector((state) => state.user);

  const history = useHistory();

  const dispatch = useDispatch();

  const cliente = useSelector((state) => state.detailCliente);

  const [input, setInput] = useState({
    phone: cliente.phone,
    email: cliente.email,
    ubication: cliente.ubication,
    image: cliente.image,
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
    history.push(`/Cliente/${user.id}`);
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
    dispatch(putDetailsCliente(input, user));
    alert("Cambios Efectuados");
    history.push(`/Cliente/${user.id}`);
  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Información</h1>
        <input
          type="text"
          name="phone"
          value={input.value}
          placeholder={`Número de teléfono: ${cliente.phone}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="email"
          value={input.value}
          placeholder={`Email: ${cliente.email}`}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <input
          type="text"
          name="ubication"
          value={input.value}
          placeholder={cliente.ubication ? cliente.ubication : "Ubicación"}
          onChange={(e) => inputChange(e)}
          className={style.input}
        />
        <div className={style.selectFile}>
          <label className={style.label}>Selecciona una imagen de perfil</label>
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
          <button className={style.edit} type="submit">Editar</button>
        </div>
      </form>

    </div>
  );
};
export default Edit;