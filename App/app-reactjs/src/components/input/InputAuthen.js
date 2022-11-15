import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InputAuthen.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const InputAuthen = (props) => {
  const [isText, setIsText] = useState(false);
  const [datetime, setDatetime] = useState("");
  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"];
    setDatetime(dt);
    props.onInput(ev.target.value);
  }
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
        {props.isPassword && !props.isRegister ? (
          <Link to="/forgot" className="text">
            Quên mật khẩu?
          </Link>
        ) : (
          ""
        )}
      </div>

      {props.isDateTime ? (
        <input
          type="date"
          value={(datetime || "").toString().substring(0, 16)}
          className="input-authen__input"
          onChange={handleChange}
        />
      ) : (
        <input
          type={typeInput}
          value={props.value}
          className={`input-authen__input ${inputPasswordEye}`}
          name={props.name}
          placeholder={props.placeholder}
          onChange={changeValueInputHandle}
        />
      )}
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
