import React from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import "./login.scss";
const Login = (props) => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Welcome Back !</h3>
          <span className="login__title__sub">
            Sign in to continue to Doot.
          </span>
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
          <div>
            <input type="checkbox"></input>
            <label>Remember me</label>
          </div>
        </div>
        <div>
          <ButtonAuthen content="Log in" />
        </div>
        <div>
          <span>Sign in with</span>
        </div>
        <div>
          <ButtonSocial />
          <ButtonSocial />
          <ButtonSocial />
        </div>
        <div className="login__link">
          <p>Don't have an account ? </p>
          <Link to="/register" className="text">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
