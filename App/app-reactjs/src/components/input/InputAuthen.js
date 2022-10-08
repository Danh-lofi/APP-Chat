import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InputAuthen.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const InputAuthen = (props) => {
  let inputPasswordEye = "";
  if (props.isPassword) {
    inputPasswordEye += "inputPasswordEye";
  }

  return (
    <div className="input-authen">
      <div>
        <label className="input-authen__label">{props.label}</label>
        {props.isPassword ? (
          <Link to="/forgot" className="text">
            Forgot Password?
          </Link>
        ) : (
          ""
        )}
      </div>
      <input
        type={props.type}
        className={`input-authen__input ${inputPasswordEye}`}
        name={props.name}
        placeholder={props.placeholder}
      ></input>
      {props.isPassword ? <FontAwesomeIcon className="eye" icon={faEye} /> : ""}
    </div>
  );
};

export default InputAuthen;
