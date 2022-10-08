import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import "./ButtonSocial.scss";
const ButtonSocial = (props) => {
  let icon = faFacebook;
  if (props.type === "fb") icon = faFacebook;
  else if (props.type === "tw") icon = faTwitter;
  else if (props.type === "gg") icon = faGoogle;

  return (
    <button className={`buttonSocial ${props.type}`}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ButtonSocial;
