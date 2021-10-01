import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import Log from "../Google_Log";
import { useSelector } from "react-redux";
import { get_email } from "../../actions";


const Login = () => {

    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleOnChange = ({target : {name, value}}) => setValues({
     
        ...values,
        [name]: value
    })
    const handleOnSubmit = async e => {
        e.preventDefault()
        console.log('Values:', values)
        try {

            
        dispatch(get_email(...values));
        setValues({
            email: '',
            password: ''
        });

        
          return  alert('Bienvenido')
        
    

        }catch(err) {
            alert('revise sus credenciales')
        }
        
    };

    const user = useSelector(state => state)

    console.log(user)

    return (
        <div className={style.container}>
            <div className={style.log}>
            <h1>Create an Account</h1>
        <form className={style.form} onSubmit={handleOnSubmit}>

      <div className={style.field}>
        <input
          onChange={handleOnChange}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className={style.field}>
        <input
          onChange={handleOnChange}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
                    <span className={style.pass}>Forgot password?</span>
                    <input className={style.login} type="submit" value="login" ></input>
                    <div className={style.link}>
                        <span>Not registered?
                            <Link className={style.create} to='/pre-login'>
                                <span className={style.create}>Create account</span>
                            </Link>
                        </span>
                    </div>
                    <div className={style.google}>
                    <Log />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login