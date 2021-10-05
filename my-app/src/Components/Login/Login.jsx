import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import Log from "./Google_Auth";
import { useSelector } from "react-redux";
import { getByEmail } from "../../actions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    //id: ''
  });

  const user = useSelector((state) => state.user);
  // const id = useSelector((state) => state.id);
  // let perfil = id;
  const handleOnChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });

  useEffect(() => {
    console.log("validate" + user.validate);
    // if(user.validate.length){
    if (user.validate === true) {
      alert("Welcome");
      //console.log("PERFIL:", perfil)

      history.push(`/walker/perfil/${user.id}`);
    } else if (user.validate === false) {
      alert("Please check your credentials");
    }
    //}
  }, [user.validate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log('Values:', values)
    dispatch(getByEmail(values));
    setValues({
      ...values,
      email: "",
      password: "",
    });
    //let auth = validate

    //setTimeout(console.log(auth), 1000);

    // console.log('Values:', values)
  };

  return (
    <div className={style.container}>
      <div className={style.log}>
        <h1>Login</h1>
        <form className={style.form} onSubmit={handleOnSubmit}>
          <div className={style.field}>
            <input
              name="email"
              onChange={handleOnChange}
              type="text"
              value={values.name}
              required
            />
            <span></span>
            <label htmlFor="">UserName</label>
          </div>
          <div className={style.field}>
            <input
              name="password"
              onChange={handleOnChange}
              type="password"
              value={values.name}
              required
            />
            <span></span>
            <label htmlFor="">Password</label>
          </div>
          <span className={style.pass}>Forgot password?</span>
          <input className={style.login} type="submit" value="login"></input>
          <div className={style.link}>
            <span>
              Not registered?
              <Link className={style.create} to="/pre-login">
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
  );
};

export default Login;
