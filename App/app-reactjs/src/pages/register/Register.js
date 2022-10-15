import React from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import axiosClients from "../../api/axiosClient";
import "./register.scss";

const Register = (props) => {
  return (

    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Register Account</h3>
          <p className="login__title__sub">Get your free Doot account now.</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Email"
            type="text"
            placeholder="Enter Email"
          />
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

            <label className="agree">By registering you agree to the Doot <span> Terms of Use </span></label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen content="Register" />
        </div>
        <div className="login__descript">
          <div className="line"></div>
          <span>Sign up using</span>
          <div className="line"></div>
        </div>
        <div className="login__btn-link">
          <ButtonSocial type="fb" />
          <ButtonSocial type="tw" />
          <ButtonSocial type="gg" />
        </div>

        <div className="login__link">
          <p>Already have an account ? </p>
          <Link to="/login" className="login__link__text">Login</Link>
        </div>
      </div>
    </div>


    
  );
};

export default Register;
