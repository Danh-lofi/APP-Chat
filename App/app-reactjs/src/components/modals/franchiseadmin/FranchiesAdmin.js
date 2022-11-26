import React, { useEffect, useRef, useState } from "react";
import "../addfriendtogroup/addfriendgroup.scss";
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
import userApi from "../../../api/userApi";
import { io } from "socket.io-client";
import FormatDate from "../../../method/FormatDate";
import { groupAction } from "../../../store/groupSlice";
import friendApi from "../../../api/friendApi";
import ListFriendFranchies from "../../list-friend/list-friend-franchies/ListFriendFranchies";
const FranchiesAdmin = () => {
  // accesstoken
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  // user
  const user = useSelector((state) => state.user.user);
  // Redux
  const dispatch = useDispatch();
  let franchiesAdmin = useSelector((state) => state.modal.franchiesAdmin);
  const { isOpen, groupInfo } = franchiesAdmin;
  // State
  const [members, setMembers] = useState(groupInfo.memberInfoChat);
  const [listFilter, setListFilter] = useState();
  const [userFranchied, setUserFranchied] = useState();
  // Set lai list
  useEffect(() => {
    const reList = groupInfo.memberInfoChat.filter((member) => {
      return member._id !== user._id;
    });
    setListFilter(reList);
    setMembers(reList);
  }, []);
  // Ẩn modal
  const hideModal = () => {
    // Action đến redux
    dispatch(modalSliceAction.setOpenFranchiesAdmin(false));
  };

  // Event
  const changeUserFranchiesHandle = (id) => {
    setUserFranchied(id);
  };
  // Set text tìm kiếm
  const changeFindTextHandle = (text) => {
    const list = listFilter.filter(
      (member) =>
        member.username.includes(text) ||
        member.name.toUpperCase().includes(text.toUpperCase())
    );
    setMembers(list);
  };

  // submit
  const submitHandle = () => {
    const groupId = groupInfo._id;
    const newAdminId = userFranchied;
    const confirmHanlde = () => {
      groupApi.leaveGroup(accessToken, groupId, newAdminId);
      // Render lại list group
      dispatch(groupAction.setIdGroupDeleted(groupId));
      hideModal();
    };

    const title = "Thoát nhóm";
    const content = "Bạn chắc chắn thoát nhóm";
    const isConfirm = true;

    const confirm = {
      title,
      content,
      onConfirm: confirmHanlde,
      isOpenConfirm: isConfirm,
    };
    dispatch(modalSliceAction.setOpenConfirm(confirm));
  };

  return (
    <div>
      <ToastContainer />
      <div className="overlay" onClick={hideModal}></div>
      <div className="modalContainer">
        <div className="headerModal">
          <p className="title">Trao quyền trưởng nhóm</p>
          <div className="closeBtn" onClick={hideModal}>
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
        </div>

        <div className="listFriend">
          <p className="label">Bạn bè</p>
          <ListFriendFranchies
            members={members}
            infoGroup={groupInfo}
            onSetUser={changeUserFranchiesHandle}
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
export default FranchiesAdmin;
