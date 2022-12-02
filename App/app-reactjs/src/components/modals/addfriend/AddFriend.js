import React, { useEffect, useRef, useState } from "react";
import "./addfriend.scss";
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserAlt,
  faUserGroup,
  faBan,
  faAddressCard,
  faExclamationTriangle,
  faTrash,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";
import { async } from "@firebase/util";
import friendApi from "../../../api/friendApi";
import FormatDate from "../../../method/FormatDate";

import { ToastContainer, toast, Icons } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const AddFriend = ({ onClose }) => {
  const socket = useRef();
  // State
  const [findText, setFindText] = useState("");
  const [userFind, setUserFind] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [isRequired, setIsRequired] = useState();
  const [idRequest, setIdRequest] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(useSelector((state) => state.user.user));

  // const friendInfo = useSelector((state) => state.user.friend);
  // const { name, avatar, username, bio, birthDate, gender, address, _id } = friendInfo;

  // end state
  // Access
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("user")).accessToken
  );

  //end access

  // Event
  const changeFindTextHandle = (value) => {
    setFindText(value);
  };

  // thu hồi lời mời
  const evictRequestFriendHandle = async () => {
    // INPUT: idRequest
    console.log("idRequest: ");
    console.log(idRequest);
    try {
      const data = await friendApi.declineFriend(idRequest);

      if (data.status === 200) {
        toast.success("Thu hồi thành công");
        // Đổi trạng thái
        setIsRequired(false);
        // Thu hồi bên bạn socket
        socket.current.emit("send-require-friend", {
          userFind,
          user,
          isDeclined: true,
        });
      }
    } catch (error) {
      toast.error("Thu hồi thất bại");
    }
  };
  //
  let isNotFound = "";
  if (!userFind) {
    isNotFound += "isNotFound"
  }

  // Set lại idRequest
  useEffect(() => {
    const callAgain = async () => {
      const data = await friendApi.findAndCheck(accessToken, findText);
      setIdRequest(data.data.idRequest);
    };
    callAgain();
  }, [isRequired]);
  //

  socket.current = io("ws://localhost:3001");


  //Event: Tìm bạn bè
  const submitButtonHandle = async () => {
    try {
      // handle Trùng số điện thoại bản thân
      if (findText === user.username) {
        return;
      }

      const data = await friendApi.findAndCheck(accessToken, findText);
      const friends = data.data.friend.friends;
      console.log(data);
      // console.log(friends);
      for( let i=0; i < friends.length; i++){
        console.log(friends[i]);
        console.log(user._id);
        if(user._id === friends[i].id){
          console.log("true");
          setIsFriend(true);
        }
        
      }
      // Set data
      setLoading(true);
      setUserFind(data.data.friend);
      setIsRequired(data.data.isRequired);
      setIdRequest(data.data.idRequest);
      //
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };
  console.log(isFriend);


  //   Yêu cầu kết bạn
  const requestFriendHandle = async () => {
    // Call API
    // gửi request senderId, receiverId
    const senderId = user._id;
    const receiverId = userFind._id;

    // Kiem tra kb

    //
    try {
      const data = await friendApi.requestFriend(senderId, receiverId);
      console.log(data);
      console.log("idRequest");
      console.log(data.data.idRequest);
      //Gửi user và id user socket
      socket.current.emit("send-require-friend", {
        userFind,
        user: { ...user, idRequest: data.data.idRequest },
      });
      // Thông báo gửi thành công
      toast.success("Gửi yêu cầu thành công");
      setIsRequired(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="overlay" onClick={onClose}></div>
      <div className="modalContainer">
        <div className="headerModal">
          <p className="title">Thêm bạn bè</p>
          <div onClick={onClose} className="closeBtn">
            x
          </div>
        </div>
        <div className="inputRangeModal">
          <InputAuthen
            onInput={(value) => changeFindTextHandle(value)}
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại cần thêm bạn bè"
          />
          <div>
            <ButtonAuthen
              onClick={submitButtonHandle}
              content="Tìm"
            ></ButtonAuthen>
          </div>
          {/* <div className="fakeFindBtn">Tìm</div> */}
        </div>
        <div className={`friendFoundRangeModal ${isNotFound}`}>
          {/* Này hong tìm thấy nha */}
          {!userFind ? (
            <div className="">Không tìm thấy nha! </div>
          ) : (
            <div>
              {isFriend ? (
                <>
                  <div className="profile__header modal">
                    <div className="header__img_contain">
                      <img src={userFind.coverImg}></img>
                    </div>
                    <div className="header__info_and_avt_contain">
                      <div className="header__avt_contain">
                        <img src={userFind.avatar}></img>
                      </div>
                      <p>{userFind.name}</p>
                    </div>
                    <div className="buttonMessPhone modal">
                      <div className="buttonMessPhone__message">
                        <p>Nhắn tin</p>
                      </div>
                      <div className="buttonMessPhone__phoneCall">
                        <p>Gọi điện</p>
                      </div>
                    </div>
                  </div>

                  <div className="infoFriend">
                    <p className="infoFriend__textInfo">Thông tin cá nhân</p>
                    <div className="infoFriend__content">
                      <div className="infoFriend__content__title_friend">
                        <p className="infoFriend__content__title_friend__span">Bio:</p>
                        <p className="infoFriend__content__title_friend__bio_friend">{userFind.bio ? userFind.bio : "Người dùng chưa đặt bio"}</p>
                      </div>
                      <div className="infoFriend__content__title_friend">
                        <p className="infoFriend__content__title_friend__span">Tên:</p>
                        <p className="infoFriend__content__title_friend__bio_friend">{userFind.name}</p>
                      </div>
                      <div className="infoFriend__content__title_friend">
                        <p className="infoFriend__content__title_friend__span">Số điện thoại:</p>
                        <p className="infoFriend__content__title_friend__bio_friend">{userFind.username}</p>
                      </div>
                      <div className="infoFriend__content__title_friend">
                        <p className="infoFriend__content__title_friend__span">Giới tính:</p>
                        <p className="infoFriend__content__title_friend__bio_friend">{userFind.gender}</p>
                      </div>
                    </div>
                  </div>

                  <div className="optionFriend">
                    <div className="optionFriend__tab">
                      <FontAwesomeIcon className="optionFriend__tab__icon" icon={faUserGroup} />
                      <p className="optionFriend__tab__text">Nhóm chung</p>
                    </div>
                    <div className="optionFriend__tab">
                      <FontAwesomeIcon className="optionFriend__tab__icon" icon={faAddressCard} />
                      <p className="optionFriend__tab__text">Chia sẻ danh thiếp</p>
                    </div>
                    <div className="optionFriend__tab">
                      <FontAwesomeIcon className="optionFriend__tab__icon" icon={faBan} />
                      <p className="optionFriend__tab__text">Chặn tin nhắn</p>
                    </div>
                    <div className="optionFriend__tab">
                      <FontAwesomeIcon className="optionFriend__tab__icon" icon={faExclamationTriangle} />
                      <p className="optionFriend__tab__text">Báo xấu</p>
                    </div>
                    <div className="optionFriend__tab">
                      <FontAwesomeIcon className="optionFriend__tab__icon" icon={faTrash} />
                      <p className="optionFriend__tab__text">Xóa khỏi danh sách bạn bè</p>
                    </div>
                  </div>
                </>
              ) :
                (
                  <div className="tabFriend">
                    <div className="left">
                      <div className="imageFriendContain">
                        <img src={userFind.avatar}></img>
                      </div>
                      <div className="infoFriendContain">
                        <p className="nameFriend">{userFind.name}</p>
                        {/* <p className="genderFriend">Nam</p> */}
                        <p className="BirthDayFriend">
                          {FormatDate(userFind.birthDate)}
                        </p>
                      </div>
                    </div>
                    <div className="btnContain">
                      {isRequired ? (
                        <FontAwesomeIcon
                          title="Thu hồi"
                          className="icon"
                          icon={faUserMinus}
                          onClick={evictRequestFriendHandle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          title="Thêm"
                          className="icon"
                          icon={faUserPlus}
                          onClick={requestFriendHandle}
                        />
                      )}
                      <FontAwesomeIcon title="Chặn" className="icon" icon={faBan} />
                    </div>
                  </div>
                )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default AddFriend;
