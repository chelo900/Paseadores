import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import Log from "./Google_Auth";
import { useSelector } from "react-redux";


const Login = () => {

    // const dispatch = useDispatch()
    // const [values, setValues] = useState({
    //     email: '',
    //     password: ''
    // })

    // const handleOnChange = ({target : {name, value}}) => setValues({
    //     ...values,
    //     [name]: value
    // })
    // const handleOnSubmit = e => {
    //     e.preventDefault()
    //     console.log('Values:', values)
    //     dispatch(createUser(values));
    //     setValues({
    //         email: '',
    //         password: ''
    //     });
    //     alert('User created successfully')
    // };

    const user = useSelector(state => state)

    console.log(user)

    return (
        <div className={style.container}>
            <div className={style.log}>
                <h1>Login</h1>
                <form className={style.form}>
                    <div className={style.field}>
                        <input type="text" required />
                        <span></span>
                        <label htmlFor="">UserName</label>
                    </div>
                    <div className={style.field}>
                        <input type="password" required />
                        <span></span>
                        <label htmlFor="">Password</label>
                    </div>
                    <span className={style.pass}>Forgot password?</span>
                    <input className={style.login} type="submit" value="login"></input>
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