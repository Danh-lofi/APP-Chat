import React from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import InputAuthen from "../../components/input/InputAuthen";
import "./forgot.scss";
const Forgot = () => {
  return (
  <div className="forgot">
    <div className="forgot_container">
    <div className="forgot__title">
          <h3 className="forgot__title__main">Reset Password</h3>
          <p className="forgot__title__sub">Reset Password with Doot.</p>
        </div>
    </div>
    <div className="forgot__commention">
      <p>Enter your Phone number and instructions will be sent to you!</p>
    </div>
    <div className="forgot__input">
      <InputAuthen
        label="Phone number"
        type="text"
        placeholder="Enter your phone"
        />
    </div>
    <div className="button_authen__wrapper">
          <ButtonAuthen content="Reset" />
    </div>
    <div className="login__link">
          <p>Remember It ? </p>
          <Link to="/login" className="login__link__text">
              Login
          </Link>
        </div>
  </div>
  );
};

export default Forgot;
