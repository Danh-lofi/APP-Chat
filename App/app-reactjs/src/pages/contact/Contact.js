import React, { useEffect } from "react";
import "../chat/chat.scss";
import UserChat from "../../components/userchat/UserChat";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import InputAuthen from "../../components/input/InputAuthen";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { profileFriend } from "../../store/userSlice";
import friendApi from "../../api/friendApi";
import ListFriend from "../../components/list-friend/ListFriend";
import ListGroup from "../../components/list-group/ListGroup";
import ListInvite from "../../components/list-invite/ListIntive";

const Contact = (props) => {
  const { isModal, onLoading } = props;
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );

  const [loading, setLoading] = useState(false);
  // Get All Friends

  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };

  useEffect(() => {
    onLoading();
  }, [isModal]);
  return (
    <div className="chat">
      <div className="chat_heading">
        <div className="chat_heading_top">
          <h3>Trò chuyện</h3>
          <FontAwesomeIcon
            onClick={props.onOpenFriend}
            className="chat_heading_top_iconPlus"
            icon={faPlus}
          />
          <FontAwesomeIcon
            className="chat_heading_top_iconPlus"
            icon={faPeopleGroup}
            onClick={props.onOpenGroup}
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
        <p className="chat_favourites_text">Tất cả lời mời</p>
        <div className="box_favour">
          <ListInvite user={user} changeLoading={changeLoadingHandle} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
