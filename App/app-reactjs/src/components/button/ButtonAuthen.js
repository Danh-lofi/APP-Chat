import React from "react";
import "./ButtonAuthen.scss";

const ButtonAuthen = (props) => {
  return (
    <button className="login_btn" onClick={props.onClick}>
      {props.content}
    </button>
  );
};

export default ButtonAuthen;
