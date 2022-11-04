import React, { useEffect } from "react";
import "./chat.scss";
import UserChat from "../../components/userchat/UserChat";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputAuthen from "../../components/input/InputAuthen";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { profileFriend } from "../../store/userSlice";
import friendApi from "../../api/friendApi";
import ListFriend from "../../components/list-friend/ListFriend";

const Chat = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );

  const [loading, setLoading] = useState(false);
  // Get All Friends

  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };

  return (
    <div className="chat">
      <div className="chat_heading">
        <div className="chat_heading_top">
          <h3>Trò chuyện</h3>
          <FontAwesomeIcon
            className="chat_heading_top_iconPlus"
            icon={faPlus}
          />
        </div>
        <div className="chat_heading_bottom">
          <input
            type="text"
            className="chat_heading_bottom_searchChat"
            placeholder="Tìm kiếm cuộc trò chuyện..."
          />
        </div>
      </div>

      <div className="chat_favourites">
        <p className="chat_favourites_text">Tất cả tin nhắn</p>
        <div className="box_favour">
          <ListFriend user={user} changeLoading={changeLoadingHandle} />
        </div>
      </div>

      {/* <div className="direct">
        <div className="heading_direct">
          <p className="text_direct">DIRECT MESSAGES</p>
          <FontAwesomeIcon className="icon_plus" icon={faPlus} />
        </div>

        <div className="box_favour">
          <ul>
            {listDerect.map((course, index) => (
              <li key={index} className={`${index === activeChatDirect ? "active_userChat" : ""}` }onClick={()=>{
                setActiveChatDirect(index);
              }}>
              <UserChat
                isOnline
                isWaitMess
                numberWaitMess={course.numberWaitMess}
                linkImage= {course.linkImage}
                nameImage={course.nameImage}
              />
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="channels">
        <div className="heading_direct">
          <p className="text_direct">channels</p>
          <FontAwesomeIcon className="icon_plus" icon={faPlus} />
        </div>

        <div className="box_favour">
          <ul>
            <li>
              <UserChat
               isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
                isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
               isChannels
                nameImage="Tran Phuc Tong"
              />
              <UserChat
                isChannels
                nameImage="Tran Phuc Tong"
              />
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Chat;
