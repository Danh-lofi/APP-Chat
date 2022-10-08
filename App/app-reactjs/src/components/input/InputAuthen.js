import React from "react";

const InputAuthen = (props) => {
  //   if (props.isPassword) {
  //     props.type = "password";
  //   }
  return (
    <div className="input-authen">
      <div>
        <label className="input-authen__label">{props.label}</label>
        {props.isPassword ? (
          <span className="input-authen__forgot">Forgot password?</span>
        ) : (
          ""
        )}
      </div>
      <input
        type={props.type}
        className="input-authen__input"
        name={props.name}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};

export default InputAuthen;
