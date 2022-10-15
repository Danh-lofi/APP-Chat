import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import { login } from "../../store/userSlice";
import "./login.scss";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(username, password);

  const submitHandle = () => {
    dispatch(login({ username, password })).then((res) => {
      console.log();
      if (res.payload.status === 200) {
        console.log(res.payload.data);
        navigate("/register");
      } else {
      }
    });
  };

  const changeUsernameHandle = (value) => {
    setUsername(value);
  };
  const changePasswordHandle = (value) => {
    setPassword(value);
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Welcome Back !</h3>
          <p className="login__title__sub">Sign in to continue to Doot.</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Username"
            type="text"
            placeholder="Enter your phone"
            onInput={changeUsernameHandle}
          />
          <InputAuthen
            label="Password"
            type="password"
            isPassword
            placeholder="Enter your password"
            onInput={changePasswordHandle}
          />
          <div className="combo-check">
            <div className="checkbox-div">
              <input className="checkbox" type="checkbox"></input>
            </div>

            <label className="remember">Remember me</label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen content="Log in" onClick={submitHandle} />
        </div>
        <div className="login__descript">
          <div className="line"></div>
          <span>Sign in with</span>
          <div className="line"></div>
        </div>
        <div className="login__btn-link">
          <ButtonSocial type="fb" />
          <ButtonSocial type="tw" />
          <ButtonSocial type="gg" />
        </div>
        <div className="login__link">
          <p>Don't have an account ? </p>
          <Link to="/register" className="login__link__text">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
