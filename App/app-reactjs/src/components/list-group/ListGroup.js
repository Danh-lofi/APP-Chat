import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../api/friendApi";
import groupApi from "../../api/groupApi";
import { groupAction } from "../../store/groupSlice";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";

const ListGroup = (props) => {
  const { user, activeChatFavou, onChangeActiveChat } = props;

  // State
  const [listGroup, setListGroup] = useState([]);
  // const [activeChatFavou, setActiveChatFavou] = useState("");
  const [activeChatDirect, setActiveChatDirect] = useState("");

  //
  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //

  // Redux
  const dispatch = useDispatch();
  const newGroup = useSelector((state) => state.group.group);
  //

  // Event

  const changeActiveFriendHandle = (index) => {
    onChangeActiveChat(index);
    const groupActive = listGroup.find((group) => {
      if (!group) return;
      return group._id === index;
    });
    console.log(groupActive);
    dispatch(userActions.setGroup(groupActive));
  };

  // Set List Group
  useEffect(() => {
    props.changeLoading();
    const getListGroups = async () => {
      const data = await groupApi.getGroups(accessToken);
      props.changeLoading();
      setListGroup(data.data.listGroup);
    };
    getListGroups();
    props.changeLoading();
  }, []);

  // set list group khi có group mới
  useEffect(() => {
    setListGroup((state) => [...state, newGroup]);
  }, [newGroup]);

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
