import React from "react";
import "./layout-main.scss";
const LayoutMain = (props) => {
  return (
    <div className="layout-main">
      <div className="layout-main__navigation"></div>
      <div className="layout-main__children">{props.children}</div>
      <div className="layout-main__main"></div>
    </div>
  );
};

export default LayoutMain;
