import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Tab = (props) => {
  const name = props.name;
  const isActive = props.tabActive[`${name}Active`];

  const activeTabHandle = () => {
    props.onClick(name);
  };
  return (
    <div
      className={`navigation__main__wrap ${isActive ? "active" : ""}`}
      onClick={activeTabHandle}
    >
      <FontAwesomeIcon icon={props.icon} />
      <div className="navigation__main__effect"></div>
    </div>
  );
};

export default Tab;
