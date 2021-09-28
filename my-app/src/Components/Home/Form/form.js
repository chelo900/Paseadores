import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

return (
    <div className = {style.total}>
        <form >
            <div>
                <label> Image Profile : </label>
            </div>
            <div>
                <label> DNI frente : </label>
            </div>
            <div>
                <label> DNI atras : </label>
            </div>
            <div>
                <label> Name : </label>
                <input 
                type = "text"
                placeholder = "Name"
                value = {input}
                name = "name"
                />
            </div>
            <div>
                <label> SurName : </label>
                <input 
                type = "text"
                placeholder = "SurName"
                value = {input}
                name = "surname"
                />
            </div>
            <div>
                <label> Age : </label>
                <input 
                type = "text"
                placeholder = "Age"
                value = {input}
                name = "Age"
                />
            </div>
            <div>
                <label> Date of Birth : </label>
                <input 
                type = "text"
                placeholder = "dd/mm/aa"
                value = {input}
                name = "date of birth"
                />
            </div>
            <div>
                <label> Phone : </label>
                <input 
                type = "number"
                placeholder = "ej: +54 11 68525749"
                value = {input}
                name = "phone"
                />
            </div>
            <div>
                <label> Email : </label>
                <input 
                type = "text"
                placeholder = "paseador@gmail.com"
                value = {input}
                name = "email"
                />
            </div>
            <div>
                <label> Password : </label>
                <input 
                type = "text"
                placeholder = "Password123"
                value = {input}
                name = "contraseña"
                />
            </div>
            <div>
                <label> Ubication : </label>
                <input 
                type = "text"
                placeholder = "ej: Palermo"
                value = {input}
                name = "ubicacion"
                />
            </div>
            <Link to = "/home">
                <button type = "submit"> Create User </button>
            </Link>
        </form>
     </div>
)
