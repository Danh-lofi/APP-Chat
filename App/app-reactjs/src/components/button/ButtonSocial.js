import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
const ButtonSocial = (props) => {
  return (
    <button>
      <FontAwesomeIcon icon={faFacebook} />
    </button>
  );
};

export default ButtonSocial;
