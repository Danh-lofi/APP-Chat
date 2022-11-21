import React, { useEffect, useRef, useState } from "react";
import "./addfriend.scss";
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBan,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";
import { async } from "@firebase/util";
import friendApi from "../../../api/friendApi";
import FormatDate from "../../../method/FormatDate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const AddFriend = ({ onClose }) => {
  const socket = useRef();
  const [findText, setFindText] = useState("");
  const [userFind, setUserFind] = useState();
  const [isRequired, setIsRequired] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(useSelector((state) => state.user.user));
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("user")).accessToken
  );

  const changeFindTextHandle = (value) => {
    setFindText(value);
  };
  socket.current = io("ws://localhost:3001");
  const submitButtonHandle = async () => {
    try {
      // handle Trùng số điện thoại bản thân
      if (findText === user.username) {
        return;
      }

      const data = await friendApi.findAndCheck(accessToken, findText);
      console.log(data);
      setLoading(true);
      setUserFind(data.data.friend);
      setIsRequired(data.data.isRequired);
      console.log(userFind);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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
      //Gửi user và id user
      socket.current.emit("send-require-friend", { userFind, user });
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
        <div className="friendFoundRangeModal">
          {/* Này hong tìm thấy nha */}
          {!userFind ? (
            <div className="">Không tìm thấy nha! </div>
          ) : (
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
                    onClick={requestFriendHandle}
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
      </div>
    </div>
  );
};
export default AddFriend;
