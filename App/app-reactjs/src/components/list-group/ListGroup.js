import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import friendApi from "../../api/friendApi";
import groupApi from "../../api/groupApi";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";

const ListGroup = (props) => {
  const { user } = props;
  const [listGroup, setListGroup] = useState([]);
  const [activeChatFavou, setActiveChatFavou] = useState("");
  const [activeChatDirect, setActiveChatDirect] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const dispatch = useDispatch();

  const changeActiveFriendHandle = (index) => {
    setActiveChatFavou(index);
    const groupActive = listGroup.find((group) => {
      if (!group) return;
      return group._id === index;
    });
    dispatch(userActions.setFriend(groupActive));
  };

  useEffect(() => {
    props.changeLoading();

    const getListFriends = async () => {
      const data = await groupApi.getGroups(accessToken);
      console.log(data);
      props.changeLoading();
      setListGroup(data.data.listGroup);
    };
    getListFriends();
    props.changeLoading();
  }, []);

  // Render list

  const List = listGroup.map((group, index) => {
    if (!group) return;
    return (
      <div
        key={index}
        className={`divIndex ${
          group._id === activeChatFavou ? "active_userChat" : ""
        }`}
        onClick={() => changeActiveFriendHandle(group._id)}
      >
        <UserChat
          isOnline
          linkImage={group.imgGroupChat}
          nameImage={group.nameGroupChat ? group.nameGroupChat : "Group"}
        />
      </div>
    );
  });

  return <div>{List}</div>;
};

export default ListGroup;
