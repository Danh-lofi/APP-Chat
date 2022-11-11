import React, { useEffect, useState } from "react";
import ChatBox from "../../components/chatbox/ChatBox";
import Navigation from "../../components/navigation/Navigation";
import AddFriend from "../../components/modals/addfriend/AddFriend";
import "./layout-main.scss";

const LayoutMain = (props) => {

  return (
    <div className="layout-main">

      <div className="layout-main__navigation">
        <Navigation />
      </div>
      <div className="layout-main__children ">{props.children}</div>
      <div className="layout-main__chatbox  back_img">
        <ChatBox />
      </div>
    </div>
  );
};

export default LayoutMain;
