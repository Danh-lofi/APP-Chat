import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import friendApi from "../../api/friendApi";
import { userActions } from "../../store/userSlice";
import UserChat from "../userchat/UserChat";
import "./listinvite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const ListInvite = (props) => {
  const { user } = props;
  const [listFriend, setListFriend] = useState([]);
  const [activeChatFavou, setActiveChatFavou] = useState("");
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const dispatch = useDispatch();

  const changeActiveFriendHandle = (index) => {
    setActiveChatFavou(index);
    const friendActive = listFriend.find((friend) => friend._id === index);
    dispatch(userActions.setFriend(friendActive));
  };

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

  return <div>{List}</div>;
};

export default ListInvite;
