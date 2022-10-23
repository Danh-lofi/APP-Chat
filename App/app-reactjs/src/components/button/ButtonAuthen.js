import React from "react";
import "./ButtonAuthen.scss";

const ButtonAuthen = (props) => {
  let inputButtonSkip = "";
  if (props.isSkip) {
    inputButtonSkip += "inputButtonSkip";
  }
  return (
    <button className= {`login_btn ${inputButtonSkip}`} onClick={props.onClick}>
      {props.content}
    </button>
  );
};

export default ButtonAuthen;
