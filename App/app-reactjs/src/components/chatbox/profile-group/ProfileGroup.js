import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTrash,
  faUserGroup,
  faBan,
  faDownload,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { faKeycdn } from "@fortawesome/free-brands-svg-icons";
import "./ProfileGroup.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";
import groupApi from "../../../api/groupApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { groupAction } from "../../../store/groupSlice";
import { io } from "socket.io-client";

const ProfileGroup = () => {
  // Socket
  const socket = useRef();
  socket.current = io("ws://localhost:3001");
  //
  // State
  const [listMember, setListMember] = useState([]);
  const [totalMember, setTotalMember] = useState();
  const [newAdminGroup, setNewAdminGroup] = useState();
  //
  // Token
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  //
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  let memberForStore = useSelector((state) => state.group.memberGroup);
  const groupInfo = useSelector((state) => state.group.group);

  // effect
  useEffect(() => {
    // if()
    setNewAdminGroup(groupInfo.adminGroup);
    setListMember(groupInfo.memberInfoChat);
    setTotalMember(groupInfo.memberInfoChat.length);
  }, [groupInfo.memberInfoChat]);
  //
  if (!groupInfo._id) return;
  //

  const {
    nameGroupChat,
    imgGroupChat,
    memberChat,
    memberInfoChat,
    adminGroup,
    _id,
  } = groupInfo;

  // Event
  const addMemberHandle = () => {
    // idGroupChat, listIdUserInGroup
    const action = {
      idGroupChat: _id,
      listIdUserInGroup: memberChat,
    };
    dispatch(modalSliceAction.setOpenAddFriendToGroup(action));
  };

  // Xóa thành viên
  // Thông báo
  const deleteFriendFromGroupHandle = (idUserDeleted) => {
    const confirm = {
      title: "Xóa thành viên",
      content: "Bạn chắc chắn xóa thành viên?",
      onConfirm: async () => {
        try {
          const data = await groupApi.deleteMemberFromGroup(_id, idUserDeleted);

          if (data.status === 200) {
            toast.success("Xóa thành công");
            // const listMemberNew = memberInfoChat.filter(
            //   (member) => member._id !== idUserDeleted
            // );

            const listMemberNew = listMember.filter(
              (member) => member._id !== idUserDeleted
            );
            // Set lại thành viên
            setListMember(listMemberNew);
            // Set lại số lượng
            setTotalMember(totalMember - 1);

            // Socket cho các user
            socket.current.emit("delete-member-group", {
              listMember: memberInfoChat,
              idUserDelete: idUserDeleted,
              idGroupDelete: _id,
              idHost: adminGroup,
            });
          }
        } catch (error) {}
      },
      isOpenConfirm: true,
    };
    dispatch(modalSliceAction.setOpenConfirm(confirm));
  };

  // Rời nhóm
  const leaveGroupHandle = () => {
    /* [INPUT]: AccessToken, groupId, newAdminId
      - Nếu là admin hiện bảng danh sách nhượng quyền admin
      - Không là admin hiện modal xác nhận
      - Không nhượng quyền giải tán nhóm
    */
    const groupId = groupInfo._id;

    // Là admin
    if (user._id === newAdminGroup) {
      dispatch(
        modalSliceAction.setOpenFranchiesAdmin({ isOpen: true, groupInfo })
      );
    }
    // Không là admin
    else {
      const confirmHanlde = () => {
        groupApi.leaveGroup(accessToken, groupId);
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
      // Render lại list group
      dispatch(groupAction.setIdGroupDeleted(groupId));
    }
  };
  // Nhượng quyền admin
  const franchiesAdminGroupHandle = (newAdminId) => {
    const groupId = groupInfo._id;
    const confirmHanlde = () => {
      groupApi.franchiesAdmin(groupId, newAdminId);
      setNewAdminGroup(newAdminId);
    };

    const title = "Chuyển trưởng nhóm";
    const content = "Bạn chắc chắn chuyển nhóm";
    const isConfirm = true;

    const confirm = {
      title,
      content,
      onConfirm: confirmHanlde,
      isOpenConfirm: isConfirm,
    };
    dispatch(modalSliceAction.setOpenConfirm(confirm));
    // Render lại list group
  };
  // Render
  // Danh sách thành viên
  const ListFriend = listMember.map((member) => {
    if (member._id === user._id) {
    }
    return (
      <div className="tag_member" key={member._id} id={member._id}>
        <div className="left_tag">
          <img src={member.avatar} alt="avatar"></img>
          <p className="name_member">{member.name}</p>
        </div>
        {member._id === newAdminGroup ? (
          <div class="tag_member__container">
            <FontAwesomeIcon
              title="Trưởng nhóm"
              className="icon tag_member__lead"
              icon={faKey}
            />
            <span> Trưởng nhóm</span>
          </div>
        ) : adminGroup === user._id ? (
          <div>
            <FontAwesomeIcon
              title="Nhượng trưởng nhóm"
              className="icon tag_member__franchies"
              icon={faKeycdn}
              onClick={() => franchiesAdminGroupHandle(member._id)}
            />
            <FontAwesomeIcon
              title="Xóa khỏi nhóm"
              className="icon"
              icon={faTrash}
              onClick={() => deleteFriendFromGroupHandle(member._id)}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  });
  return (
    <div className="profile_friend_container">
      <ToastContainer />
      <div className="header">
        <h2>Thông tin nhóm</h2>
      </div>
      <div className="infor">
        <div className="img_div">
          <div className="contain_img">
            <img className="avt_friend" src={imgGroupChat} alt={""}></img>
          </div>
        </div>
        <p className="friend_name">{nameGroupChat}</p>
        <div className="contain_btn">
          <div className="btn" onClick={leaveGroupHandle}>
            <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
            <p>Rời nhóm</p>
          </div>
          <div className="btn" onClick={addMemberHandle}>
            <FontAwesomeIcon className="icon" icon={faUserGroup} />
            <p>Thêm thành viên</p>
          </div>
          <div className="btn">
            <FontAwesomeIcon className="icon" icon={faBan} />
            <p>Chặn</p>
          </div>
        </div>
        <div className="contain_title_friend">
          <div className="contain_title_friend__member">
            <p>Thành viên nhóm</p>
            <span>{totalMember} thành viên</span>
          </div>
          <div className="contain_list_tag">{ListFriend}</div>
        </div>
        <div className="contain_media_friend">
          <p>Media</p>
          <div className="contain_media">
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
            <div className="media">
              <img src={imgGroupChat} alt=""></img>
            </div>
          </div>
        </div>
        <div className="contain_files_friends">
          <p>File đã gửi</p>
          <div className="file_contain">
            <div className="file">
              <div className="file_infor">
                <p className="file_name">tailieu.docs</p>
                <p className="size_name">1.50MB</p>
              </div>
              <div className="file_action">
                <FontAwesomeIcon className="icon" icon={faDownload} />
                <FontAwesomeIcon className="icon" icon={faTrash} />
              </div>
            </div>
          </div>
          <div className="file_contain">
            <div className="file">
              <div className="file_infor">
                <p className="file_name">tailieu.docs</p>
                <p className="size_name">1.50MB</p>
              </div>
              <div className="file_action">
                <FontAwesomeIcon className="icon" icon={faDownload} />
                <FontAwesomeIcon className="icon" icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGroup;
