import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../../api/friendApi";

import UserChat from "../../userchat/UserChat";
import "../listfriend.scss";

const ListFriendFranchies = (props) => {
  const { members, infoGroup, onSetUser } = props;
  // State

  const [activeChatFavou, setActiveChatFavou] = useState("");
  // Redux
  const dispatch = useDispatch();
  //
  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //

  useEffect(() => {}, []);

  const changeActiveFriendHandle = (index) => {
    // setActiveChatFavou(index);
  };

  const handleChange = (e) => {
    onSetUser(e.target.value);
  };
  // Render list
  const List = members.map((friend, index) => {
    return (
      <div
        key={index}
        className={`list__friend__group ${
          friend._id === activeChatFavou ? "active_userChat" : ""
        }`}
        // onClick={() => changeActiveFriendHandle(friend._id)}
      >
        <input
          type="radio"
          name="idMembers"
          value={friend._id}
          onChange={handleChange}
        />
        <UserChat
          isOnline
          linkImage={friend.avatar}
          nameImage={friend.name ? friend.name : friend.username}
        />
      </div>
    );
  });

  return <div className="list__friend__group__container">{List}</div>;
};

export default ListFriendFranchies;
