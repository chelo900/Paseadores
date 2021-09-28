import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const [input, setInput] = useState({
    name : "",
    surname : "",
    image : "",
    phone : "" ,
    email : "",
    carer : "",
    age : "",
    dateofBirth : "",
})

return (
    <div className = {style.total}>
        <form >
            <div>
                <label> Image Profile : </label>
                    <input 
                        type="file" 
                        accept=".jpg, .png, .pdf"
                        value = {input.image}
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
                    value = {input.dni}
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
                    value = {input.dni}
                />
            </div>
            <div>
                <label> Name : </label>
                    <input 
                    type = "text"
                    placeholder = "Name"
                    value = {input.name}
                    name = "name"
                    />
            </div>
            <div>
                <label> SurName : </label>
                    <input 
                    type = "text"
                    placeholder = "SurName"
                    value = {input.surname}
                    name = "surname"
                    />
            </div>
            <div>
                <label> Age : </label>
                    <input 
                    type = "text"
                    placeholder = "Age"
                    value = {input.age}
                    name = "Age"
                />
            </div>
            <div>
                <label> Date of Birth : </label>
                    <input 
                    type = "text"
                    placeholder = "dd/mm/aa"
                    value = {input.dateofBirth}
                    name = "date of birth"
                    />
            </div>
            <div>
                <label> Phone : </label>
                    <input 
                    type = "number"
                    placeholder = "ej: +54 11 68525749"
                    value = {input.phone}
                    name = "phone"
                    />
            </div>
            <div>
                <label> Email : </label>
                    <input 
                    type = "text"
                    placeholder = "paseador@gmail.com"
                    value = {input.email}
                    name = "email"
                    />
            </div>
            <div>
                <label> Password : </label>
                    <input 
                    type = "text"
                    placeholder = "Password123"
                    value = {input.password}
                    name = "contraseña"
                    />
            </div>
            <div>
                <label> Carer : </label>
                <select>
                    <option> Select </option>
                    <option> Walker </option>
                    <option> Carer </option>
                    <option> Walker and Carer</option>
                </select>
            </div>
            <Link to = "/">
                <button type = "submit"> Create User </button>
            </Link>
        </form>
     </div>
)