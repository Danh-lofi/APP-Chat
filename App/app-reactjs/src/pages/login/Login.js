import React from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import axiosClients from "../../api/axiosClient";
import "./login.scss";
const Login = (props) => {
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
          />
          <InputAuthen
            label="Password"
            type="password"
            isPassword
            placeholder="Enter your password"
          />
          <div className="combo-check">
            <div className="checkbox-div">
              <input className="checkbox" type="checkbox"></input>
            </div>

            <label className="remember">Remember me</label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen content="Log in" />
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
