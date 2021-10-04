import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPaseadorForId, newPaseador } from "../../actions";
import style from "./Form.module.css";

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
  return errors;
}

const Form = () => {
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
    birth_day: "",
    phone: "",
    email: "",
    password: "",
    service: "",
    front_dni: "",
    back_dni: "",
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
  const uploadFront = async e => {
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
    const front = await res.json()
    setInput(values => ({
      ...values,
      front_dni: front.secure_url,
    }))
  }
  const uploadBack = async e => {
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
    const back = await res.json()
    setInput(values => ({
      ...values,
      back_dni: back.secure_url,
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
      dispatch(newPaseador(input));
      alert("User Created successfully");
      setInput({
        image: "",
        dni: "",
        name: "",
        surname: "",
        birth_day: "",
        phone: "",
        email: "",
        password: "",
        service: "",
        front_dni: "",
        back_dni: "",
      });

      history.push("/login");
    }
  }
  // function redirection(newId) {
  //   history.push(`/walker/perfil/${newId}`);
  // }

  function handleService(e) {
    setInput({
      ...input,
      service: e.target.value,
    });
  }

  return (
  <div className={style.tt}>
    <div className={style.total}>
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label> Foto de Perfil : </label>
          <input
            type="file"
            accept=".jpg, .png, .pdf"
            name="file"
            onChange={uploadImage}
          />
        </div>
        <div>
          <label> Tipo de Documento </label>
          <select>
            <option> DNI </option>
            <option> Cédula de identidad </option>
            <option> Cédula de ciudadanía </option>
            <option> Documento único de identidad </option>
            <option> Cédula de identidad Civil </option>
            <option> Pasaporte </option>
          </select>
          </div>
          <div>
          <label> Foto del Frente del Documento </label>
          <input
            type="file"
            accept=".jpg, .png, .pdf"
            name="front"
            onChange={uploadFront}
          />
        </div>
        <div>
          <label> Foto del Reverso del Documento </label>
          <input
            type="file"
            accept=".jpg, .png, .pdf"
            name="back"
            onChange={uploadBack}
          />
        </div>
        <div>
          <label> Nombre : </label>
          <input
            type="text"
            placeholder="Nombre"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={style.err}> {errors.name} </p>}
        </div>
        <div>
          <label> Apellido : </label>
          <input
            type="text"
            placeholder="Apellido"
            value={input.surname}
            name="surname"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Dni : </label>
          <input
            type="text"
            placeholder="Dni"
            value={input.dni}
            name="dni"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Fecha de Nacimiento : </label>
          <input
            type="text"
            placeholder="dd/mm/aa"
            value={input.birth_day}
            name="birth_day"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Teléfono : </label>
          <input
            type="number"
            placeholder="ej: +54 11 68525749"
            value={input.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Email : </label>
          <input
            type="text"
            placeholder="paseador@gmail.com"
            value={input.email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <p className={style.err}> {errors.email} </p>}
        </div>
        <div>
          <label> Contraseña : </label>
          <input
            type="password"
            placeholder="Password123"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <p className={style.err}> {errors.password} </p>}
        </div>
        <div>
          <label> Servicio : </label>
          <select onChange={(e) => handleService(e)} required>
            <option value="" req>
              {" "}
              Elegir...{" "}
            </option>
            <option value="Walker"> Paseador </option>
            <option value="Carer"> Cuidador </option>
            <option value="Walker and Carer"> Paseador y Cuidador</option>
          </select>
        </div>
        <button type="submit" disabled={Object.values(errors).length > 0}> Crear Usuario </button>
      </form>
    </div>
  </div>
  
  );
};

export default Form;
