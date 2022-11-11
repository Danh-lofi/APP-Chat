import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import friendApi from "../../api/friendApi";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";
import "./listfriend.scss";
const ListFriendCreateGroup = (props) => {
  const { user, members } = props;
  const [listFriend, setListFriend] = useState([]);
  const [activeChatFavou, setActiveChatFavou] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const dispatch = useDispatch();

  useEffect(() => {
    props.changeLoading();
    const getListFriends = async () => {
      const data = await friendApi.getFriend(accessToken);
      props.changeLoading();
      console.log(data);
      setListFriend(data.data.listFriend);
    };
    getListFriends();
    props.changeLoading();
  }, []);

  const changeActiveFriendHandle = (index) => {
    // setActiveChatFavou(index);
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      props.setMembers([...members, { id: value }]);
    } else {
      props.setMembers(members.filter((e) => e.id !== value));
    }
  };
  // Render list
  const List = listFriend.map((friend, index) => {
    return (
      <div
        key={index}
        className={`list__friend__group ${
          friend._id === activeChatFavou ? "active_userChat" : ""
        }`}
        // onClick={() => changeActiveFriendHandle(friend._id)}
      >
        <input
          type="checkbox"
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

export default ListFriendCreateGroup;
