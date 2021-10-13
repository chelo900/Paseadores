import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from "react-router";
import { putDetailsCliente } from "../../actions";
import style from "./informacion.module.css";
import Swal from "sweetalert2";

const Edit = () => {

  const user = useSelector((state) => state.user);

  const history = useHistory();
  const {id} =useParams()
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

  const handlerSubmit =  () => {
    console.log(user);
    dispatch(putDetailsCliente(input, user));
    Swal.fire({
      icon: 'success',
      title: 'Cambios Efectuados',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(history.push(`/Cliente/${user.id}`), 3000);

  };

  return (
    <div className={style.container}>
      <form className={style.formulario} onSubmit={handlerSubmit}>
        <h1>Informacion</h1>
            <input
                type="text"
                name="phone"
                value={input.value}
                placeholder={cliente.phone}
                onChange={(e) => inputChange(e)}
            />
            <input
                type="text"
                name="email"
                value={input.value}
                placeholder={cliente.email}
                onChange={(e) => inputChange(e)}
            />
            <input
                type="text"
                name="ubication"
                value={input.value}
                placeholder={cliente.ubication ? cliente.ubication : "Ubicación"}
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