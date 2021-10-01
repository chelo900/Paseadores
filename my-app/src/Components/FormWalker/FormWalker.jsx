import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { newPaseador } from "../../actions";
import style from "./Form.module.css";

function validate(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "Required";
  }
  if (!input.email) {
    errors.email = "Required";
  }
  if (
    !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
      input.email
    )
  ) {
    errors.email = "Dirección de mail no valida";
  }

  if (!input.password) {
    errors.password = "Required";
  } else if (`${input.password}`.length < 7) {
    errors.password = "Password must be larger than 7 characters";
  }
  return errors;
}

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setError] = useState({});
  const newId = useSelector(state => state.newId)
  useEffect(() => {
    if (newId.length !== 0){
    redirection(newId)
    }
  }, [newId])
  
  

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
    back_dni: ""
  });

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
      back_dni:""

    });
    
    
    
  }
  function redirection(){
    history.push(`/walker/perfil/${newId}`)
  }
  
  

  function handleService(e) {
    setInput({
      ...input,
      service: e.target.value,
    });
  }

  return (
    <div className={style.total}>
      <form onSubmit={(e) => handleSubmit(e)}>
       
        <div>
                    <label> Image Profile : </label>
                        <input 
                            type="file" 
                            accept=".jpg, .png, .pdf"
                            value = {input.image}
                            name = "image"
                            onChange={(e) => handleChange(e)}

                        />
                </div>
        <div>
                    <label> Photo of identity document in front : </label>
                        <select>
                            <option> DNI </option>
                            <option> Cédula de identidad </option>
                            <option> Cédula de ciudadanía </option>
                            <option> Documento único de identidad </option>
                            <option> Cédula de identidad Civil </option>
                            <option> Pasaporte </option>
                        </select>
                    <input 
                        type="file" 
                        accept=".jpg, .png, .pdf"
                        value = {input.front_dni}
                        name = "front_dni"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label> Photo of Identity document back : </label>
                        <select>
                            <option> DNI </option>
                            <option> Cédula de identidad </option>
                            <option> Cédula de ciudadanía </option>
                            <option> Documento único de identidad </option>
                            <option> Cédula de identidad Civil </option>
                            <option> Pasaporte </option>
                        </select>
                    <input 
                        type="file" 
                        accept=".jpg, .png, .pdf"
                        value = {input.back_dni}
                        name = "back_dni"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
        <div>
          <label> Name : </label>
          <input
            type="text"
            placeholder="Name"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p> {errors.name} </p>}
        </div>
        <div>
          <label> SurName : </label>
          <input
            type="text"
            placeholder="SurName"
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
          <label> Date of Birth : </label>
          <input
            type="text"
            placeholder="dd/mm/aa"
            value={input.birth_day}
            name="birth_day"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label> Phone : </label>
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
          {errors.email && <p> {errors.email} </p>}
        </div>
        <div>
          <label> Password : </label>
          <input
            type="text"
            placeholder="Password123"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <p> {errors.password} </p>}
        </div>
        <div>
          <label> Service : </label>
          <select onChange={(e) => handleService(e)} required>
            <option value="" req> Select </option>
            <option> Walker </option>
            <option> Carer </option>
            <option> Walker and Carer</option>
          </select>
        </div>
        <button type="submit"> Create User </button>
      </form>
    </div>
  );
};

export default Form;
