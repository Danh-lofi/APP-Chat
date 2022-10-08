import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

import bg from "../../assets/image/auth/bg.png";
import "./stayout.scss";
const LayoutAuth = (props) => {
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth__left">
          <div className="auth__logo">
            <FontAwesomeIcon icon={faMessage} className="auth__logo__icon" />
            <span className="auth__logo__name">Doot</span>
          </div>
          <div>
            <h4 className="auth__logo__slogan">
              Responsive Bootstrap 5 Chat App
            </h4>
          </div>
        </div>
        <div className="auth__right">
          <div className="auth__right__container">{props.children}</div>
        </div>
        <img className="auth__bg" src={bg} alt="bg"></img>
      </div>
    </div>
  );
};

export default LayoutAuth;
