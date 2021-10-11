import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { newClient } from "../../actions";
import style from "./FormClient.module.css";

function validate(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Requerido";
  }
  if (!input.email) {
    errors.email = "Requerido";
  }
  if (
    !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
      input.email
    )
  ) {
    errors.email = "Dirección de mail no valida";
  }

  if (!input.password) {
    errors.password = "Requerido";
  } else if (`${input.password}`.length < 7) {
    errors.password = "La contraseña debe ser de al menos 7 caracteres";
  }
  if (!input.password2) {
    errors.password2 = "Requerido";
  } else if (input.password !== input.password2) {
    errors.password2 = "Las contraseñas no coinciden"
  }
  return errors;
}

const FormClient = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setError] = useState({ a: "" });
  // const newId = useSelector((state) => state.newId);
  // useEffect(() => {
  //   console.log(newId);
  //   if (newId.length !== 0) {
  //     redirection(newId);
  //   }
  // }, [newId]);

  const [input, setInput] = useState({
    image: "",
    dni: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
    description: ""
  });



  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'projectimages')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dvmrhxfht/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setInput(values => ({
      ...values,
      image: file.secure_url,
    }))
  }


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 1)
      alert("Completa la informacion solicitada");
    else {
      dispatch(newClient(input));
      alert("User Created successfully");
      setInput({
        image: "",
        dni: "",
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
        description: ""
      });

      history.push("/login");
    }
  }
  // function redirection(newId) {
  //   history.push(`/walker/perfil/${newId}`);
  // }



  return (
    <div className={style.tt}>
      <div className={style.total}>
        <h1 className={style.title}>Registrarse</h1>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.izquierda}>
            <div className={style.container}>
              <label className={style.label}> Nombre : </label>
              <input
                className={style.inputComun}
                type="text"
                placeholder="Nombre"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className={style.err}> {errors.name} </p>}
            </div>
            <div className={style.container}>
              <label className={style.label}> Apellido : </label>
              <input
                className={style.inputComun}
                type="text"
                placeholder="Apellido"
                value={input.surname}
                name="surname"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.container}>
              <label className={style.label}> Teléfono : </label>
              <input
                className={style.inputComun}
                type="number"
                placeholder="ej: +54 11 68525749"
                value={input.phone}
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.container}>
              <label className={style.label}> Foto de Perfil : </label>
              <div>
                <input
                  className={style.inputImg}
                  type="file"
                  accept=".jpg, .png, .pdf"
                  name="file"
                  onChange={uploadImage}
                />
              </div>
            </div>
            <div className={style.container}>
              <label className={style.label}> Descripción  : </label>
              <textarea
                className={style.textArea}
                type="number"
                placeholder="Cantidad de perro, tamaño..."
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
                rows="10" cols="50"
              />
            </div>
          </div>
          <div className={style.derecha}>
            <div className={style.container}>
              <label className={style.label}> Tipo de Documento </label>
              <select className={style.select}>
                <option> DNI </option>
                <option> Cédula de identidad </option>
                <option> Cédula de ciudadanía </option>
                <option> Documento único de identidad </option>
                <option> Cédula de identidad Civil </option>
                <option> Pasaporte </option>
              </select>
            </div>
            <div className={style.container}>
              <label className={style.label}> Dni : </label>
              <input
                className={style.inputComun}
                type="text"
                placeholder="Dni"
                value={input.dni}
                name="dni"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.container}>
              <label className={style.label}> Email : </label>
              <input
                className={style.inputComun}
                type="text"
                placeholder="paseador@gmail.com"
                value={input.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
              {errors.email && <p className={style.err}> {errors.email} </p>}
            </div>
            <div className={style.container}>
              <label className={style.label}> Contraseña : </label>
              <input
                className={style.inputComun}
                type="password"
                placeholder="Password123"
                value={input.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {errors.password && <p className={style.err}> {errors.password} </p>}
            </div>
            <div className={style.container}>
              <label className={style.label}> Repetir Contraseña : </label>
              <input
                className={style.inputComun}
                type="password"
                placeholder="Password123"
                value={input.password2}
                name="password2"
                onChange={(e) => handleChange(e)}
              />
              {errors.password2 && <p className={style.err}> {errors.password2} </p>}
            </div>
          </div>
        </form>
        <div className={style.containerBtn}>
          <button className={style.btn} type="submit" disabled={Object.values(errors).length > 0}> Crear Usuario </button>
        </div>
      </div>
    </div>
  );
};

export default FormClient;