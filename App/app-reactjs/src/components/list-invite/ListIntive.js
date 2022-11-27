import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../api/friendApi";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";
import "./listinvite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const ListInvite = (props) => {
  const { user } = props;
  // Socket
  const socket = useRef();
  socket.current = io("ws://localhost:3001");

  // State
  const [listFriend, setListFriend] = useState([]);
  const [activeChatFavou, setActiveChatFavou] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  // Redux
  const dispatch = useDispatch();
  const userRequired = useSelector((state) => state.friend.userRequired);
  const isEvicted = useSelector((state) => state.friend.isEvicted);
  //
  // Set lại list khi có thêm yêu cầu kết bạn
  useEffect(() => {
    if (isEvicted) {
      const listNotEvicted = listFriend.filter(
        (item) => item.username !== userRequired.username
      );
      setListFriend(listNotEvicted);
    } else setListFriend((listFriend) => [...listFriend, userRequired]);
  }, [userRequired, isEvicted]);
  //

  // gọi lấy danh sách kết bạn
  useEffect(() => {
    props.changeLoading();
    const getListFriends = async () => {
      const data = await friendApi.getInvitesFriend(user._id);

      props.changeLoading();
      setListFriend(data.data.listUser);
    };
    getListFriends();
    props.changeLoading();
  }, []);
  //

  // Xử lí đồng ý kết bạn
  const acceptRequestFriendHandle = async (idRequest, friend) => {
    try {
      const data = await friendApi.acceptFriend(idRequest);
      if (data.status === 200) {
        toast.success("Kết bạn thành công");
        // Set lại danh sách yêu cầu
        const listRemoveUserAccept = listFriend.filter(
          (user) => user.username !== friend.username
        );
        setListFriend(listRemoveUserAccept);
        // Gửi thông báo bạn bè kb thành công socket
        socket.current.emit("send-require-friend", {
          userFind: friend,
          user: user,
          isAccept: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  // Xử lí từ chối kết bạn
  const deninedRequestFriendHandle = async (idRequest, friend) => {
    const data = await friendApi.declineFriend(idRequest);
    try {
      if (data.status === 200) {
        toast.success("Từ chối thành công");
        // Set lại list
        const listRemoveUserAccept = listFriend.filter(
          (user) => user.username !== friend.username
        );
        setListFriend(listRemoveUserAccept);
      }
    } catch (error) {}
  };
  //
  // Render list
  const List = listFriend.map((friend, index) => {
    const idRequest = friend.idRequest;
    return (
      <div
        key={index}
        className={`list__invite 

        `}
        // onClick={() => changeActiveFriendHandle(friend._id)}
      >
        <UserChat
          linkImage={friend.avatar}
          nameImage={friend.name ? friend.name : friend.username}
        />
        <div className="list__invite__icon">
          <FontAwesomeIcon
            icon={faCheck}
            className="list__invite__icon__agree"
            onClick={() => acceptRequestFriendHandle(idRequest, friend)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="list__invite__icon__denied"
            onClick={() => deninedRequestFriendHandle(idRequest, friend)}
          />
        </div>
      </div>
    );
  });
  //
  return (
    <div>
      <ToastContainer />

      {List}
    </div>
  );
};

export default ListInvite;
