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
  });
  var walker = localStorage.getItem("userWalker");

  useEffect(() => {
    if (walker === "false" || walker === "true") {
      history.push(`/cardsUsers`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((state) => state.user);

  const handleOnChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });

  useEffect(() => {
    if (user.validate === true) {
      alert("Welcome");
      localStorage.clear();
      localStorage.setItem("userValidate", user.validate);
      localStorage.setItem("userToken", user.token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userWalker", user.walker);
      localStorage.setItem("userAdmin", user.admin);
      history.push(`/walker/perfil/${user.id}`);
      if (user.walker) {
      } else {
        history.push(`/cardsUsers`);
      }
    } else if (user.validate === false) {
      alert("Please check your credentials");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.validate, user.walker]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(getByEmail(values));
    setValues({
      ...values,
      email: "",
      password: "",
    });
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
          <Link to="/login/recoverPassword">
            {" "}
            <span className={style.pass}>Forgot password?</span>{" "}
          </Link>
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
