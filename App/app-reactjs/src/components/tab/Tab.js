import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Tab = (props) => {
  const name = props.name;
  const isActive = props.tabActive[`${name}Active`];

  const activeTabHandle = () => {
    props.onClick(name);
  };
  return (
    <Link
      to={`/${name}`}
      className={`navigation__main__wrap ${isActive ? "active" : ""}`}
      onClick={activeTabHandle}
    >
      <FontAwesomeIcon icon={props.icon} />
      <div className="navigation__main__effect"></div>
    </Link>
  );
};

export default Tab;
