import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../api/friendApi";
import groupApi from "../../api/groupApi";
import { groupAction } from "../../store/groupSlice";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";

const ListGroup = (props) => {
  const { user, activeChatFavou, onChangeActiveChat, changeLoading } = props;

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
  const idGroupDeletedStore = useSelector(
    (state) => state.group.idGroupDeleted
  );
  const [idGroupDeleted, setIdGroupDeleted] = useState(idGroupDeletedStore);

  //

  // Event

  const changeActiveFriendHandle = async (index) => {
    changeLoading();
    onChangeActiveChat(index);
    const groupActive = listGroup.find((group) => {
      if (!group) return;
      return group._id === index;
    });

    // Call API lấy lại thông tin group
    const res = await groupApi.getGroup(groupActive._id);
    const groupInfo = res.data;
    //

    const data = [];
    const listFriend = groupInfo.memberChat;
    for (const friend of listFriend) {
      const item = await friendApi.findFriendById(friend.id);
      data.push(item.data);
    }
    // Chuyển đến store với object chưa dữ liệu bạn bè
    const groupToStore = { ...groupActive, memberInfoChat: data };
    dispatch(groupAction.setGroup(groupToStore));
    dispatch(userActions.setNullFriend());
    changeLoading();
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
    let isExist = false;
    listGroup.forEach((group) => {
      if (group) {
        if (group._id === newGroup._id) isExist = true;
      }
    });
    if (!isExist) setListGroup((state) => [...state, newGroup]);
  }, [newGroup]);

  // Set lại effect List khi bị đuổi
  useEffect(() => {
    // listGroup.forEach((group) => console.log(group));

    const newListGroup = listGroup.filter((group) => {
      if (group) {
        return group._id !== idGroupDeletedStore;
      }
    });
    setListGroup(newListGroup);
  }, [idGroupDeletedStore]);
  //

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
