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
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";
import ListFriendCreateGroup from "../../list-friend/ListFriendCreateGroup";
import groupApi from "../../../api/groupApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddFriendToGroup = ({ onClose }) => {
  // Redux
  const dispatch = useDispatch();
  const infoGroup = useSelector((state) => state.modal.addFriendToGroup);

  //

  // State
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).user
  );
  const [listFriend, setListFriend] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [findText, setFindText] = useState("");

  //

  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //
  // Event
  const changeLoadingHandle = () => {
    setLoading((prev) => !loading);
  };
  const changeFindTextHandle = (value) => {
    setFindText(value);
  };
  const submitButtonHandle = () => {
    console.log(findText);
  };
  const closeModalHandle = () => {
    dispatch(modalSliceAction.setOpenAddFriendToGroup());
  };
  //

  // Thêm thành viên
  const submitHandle = async () => {
    // List id user, idGroupChat
    try {
      const data = await groupApi.addUsersToGroup(
        infoGroup.idGroupChat,
        members
      );
      if (data.status === 200) {
        toast.success("Thêm thành công");
        dispatch(modalSliceAction.setOpenAddFriendToGroup());
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="overlay" onClick={closeModalHandle}></div>
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
            infoGroup={infoGroup}
          />
        </div>
        <div className="footer">
          <ButtonAuthen
            content="Xác nhận"
            onClick={submitHandle}
          ></ButtonAuthen>
        </div>
      </div>
    </div>
  );
};
export default AddFriendToGroup;
