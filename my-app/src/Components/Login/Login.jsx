import React from "react";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
const Login = () => {
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
                            <Link className={style.create} to='/createWalker'>
                                <span className={style.create}>Create account</span>
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login