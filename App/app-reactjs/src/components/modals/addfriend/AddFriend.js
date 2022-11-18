import React, { useState } from "react";
import "./addfriend.scss";
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faBan } from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";
import { async } from "@firebase/util";
import friendApi from "../../../api/friendApi";

const AddFriend = ({ onClose }) => {
  const [findText, setFindText] = useState("");
  const [userFind, setUserFind] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const changeFindTextHandle = (value) => {
    setFindText(value);
  };
  const submitButtonHandle = async () => {
    try {
      // handle Trùng số điện thoại bản thân
      if (findText === user.username) {
        return;
      }
      const data = await friendApi.findFriend(findText);
      setLoading(true);
      setUserFind(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   Yêu cầu kết bạn
  const requestFriendHandle = () => {
    // Call API
    // gửi request senderId, receiverId
    const senderId = user._id;
    const receiverId = userFind._id;
    console.log(senderId);
    console.log(receiverId);
    // Kiem tra kb
    try {
      const data = friendApi.requestFriend(senderId, receiverId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
                  <p className="BirthDayFriend">{userFind.birthDate}</p>
                </div>
              </div>
              <div className="btnContain">
                <FontAwesomeIcon
                  title="Thêm"
                  className="icon"
                  icon={faUserPlus}
                  onClick={requestFriendHandle}
                />
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
