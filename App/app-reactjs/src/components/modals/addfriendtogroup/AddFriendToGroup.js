import React, { useState } from "react";
import "./addfriendgroup.scss";
import InputAuthen from "../../input/InputAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBan,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonAuthen from "../../button/ButtonAuthen";
import { useDispatch } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";
import ListFriendCreateGroup from "../../list-friend/ListFriendCreateGroup";

const AddFriendToGroup = ({ onClose }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const [listFriend, setListFriend] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const [members, setMembers] = useState([{ id: user._id }]);
  const [loading, setLoading] = useState(false);

  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };
  const [findText, setFindText] = useState("");
  const dispatch = useDispatch();
  const changeFindTextHandle = (value) => {
    setFindText(value);
  };
  const submitButtonHandle = () => {
    console.log(findText);
  };
  const closeModalHandle = () => {
    dispatch(modalSliceAction.setOpen(false));
  };
  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className="modalContainer">
        <div className="headerModal">
          <p className="title">Thêm thành viên</p>
          <div
            // onClick={onClose}
            className="closeBtn"
            onClick={closeModalHandle}
          >
            x
          </div>
        </div>
        <div className="inputRangeModal">
          <InputAuthen
            onInput={(value) => changeFindTextHandle(value)}
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại cần thêm vào nhóm"
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
          <div className="tabFriend">
            <div className="left">
              <div className="imageFriendContain">
                <img src="https://nhanquyenvn.org/wp-content/uploads/2021/03/tran-dan.png"></img>
              </div>
              <div className="infoFriendContain">
                <p className="nameFriend">Trần Dần</p>
                {/* <p className="genderFriend">Nam</p> */}
                <p className="BirthDayFriend">30/2/1977</p>
              </div>
            </div>
            <div className="btnContain">
              <FontAwesomeIcon
                title="Thêm"
                className="icon"
                icon={faCirclePlus}
              />
            </div>
          </div>
        </div>
        <div className="listFriend">
          <p className="label">Bạn bè</p>
          <ListFriendCreateGroup
            user={user}
            changeLoading={changeLoadingHandle}
            setMembers={setMembers}
            members={members}
          />
        </div>
        <div className="footer">
          <ButtonAuthen content="Xác nhận"></ButtonAuthen>
        </div>
      </div>
    </div>
  );
};
export default AddFriendToGroup;
