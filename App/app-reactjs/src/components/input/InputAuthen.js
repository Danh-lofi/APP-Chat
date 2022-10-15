import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InputAuthen.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputAuthen = (props) => {
  const [isText, setIsText] = useState(true);
  let inputPasswordEye = "";
  let typeInput = !isText && props.isPassword ? "password" : props.type;
  const changeTypeInputHandle = () => {
    setIsText((prev) => !prev);
  };
  const changeValueInputHandle = (e) => {
    props.onInput(e.target.value);
  };
  typeInput = !isText && props.isPassword ? "password" : "text";
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
        type={typeInput}
        className={`input-authen__input ${inputPasswordEye}`}
        name={props.name}
        placeholder={props.placeholder}
        onChange={changeValueInputHandle}
      />
      {props.isPassword ? (
        <FontAwesomeIcon
          className="eye"
          icon={isText ? faEye : faEyeSlash}
          onClick={changeTypeInputHandle}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputAuthen;
