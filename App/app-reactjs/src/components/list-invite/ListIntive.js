import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../api/friendApi";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";
import "./listinvite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";

const ListInvite = (props) => {
  const { user } = props;
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
    console.log("isEvicted");
    console.log(isEvicted);
    console.log("userRequired");
    console.log(userRequired);
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
      console.log(data);
      props.changeLoading();
      setListFriend(data.data.listUser);
    };
    getListFriends();
    props.changeLoading();
  }, []);
  //

  // Xử lí đồng ý kết bạn
  const acceptRequestFriendHandle = (idRequest) => {
    // Gửi id của yêu cầu
    console.log("idRequest" + idRequest);
    try {
      const data = friendApi.acceptFriend(idRequest);
      if (data.status === 200) {
        alert("thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
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
            onClick={() => acceptRequestFriendHandle(idRequest)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="list__invite__icon__denied"
          />
        </div>
      </div>
    );
  });
  //
  return <div>{List}</div>;
};

export default ListInvite;
