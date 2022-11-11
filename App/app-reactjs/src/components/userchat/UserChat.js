import "./UserChat.scss";
import React, { useState } from "react";

const UserChat = (props) => {
  return ( <>
    <div className="userChat" onClick={props.onClick}>
      {props.isChannels ? (
        <div className="userChat_boxImgUser">
          <span>#</span>
        </div>
      ) : (
        <div className="userChat_boxImgUser">
          <img className="avt_chat" src={props.linkImage} alt="avtChat" />
          {props.isOnline ? (
            <span className="userChat_boxImgUser_statusUserChat"></span>
          ) : (
            ""
          )}
        </div>
      )}

      {props.isWaitMess ? (
        <>
          <div className="userChat_name">
            <p className="userChat_name__isWait">{props.nameImage}</p>
          </div>
          <div className="userChat_amountMess">
            <span className="userChat_amountMess_numberMess">
              {props.numberWaitMess}
            </span>
          </div>
        </>
      ) : (
        <div className="userChat_name">
          <p className="userChat_nameNoWait">{props.nameImage}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default UserChat;
