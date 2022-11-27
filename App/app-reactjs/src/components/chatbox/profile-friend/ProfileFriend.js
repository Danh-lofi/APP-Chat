import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserGroup,
  faBan,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ProfileFriend.scss";
import { useDispatch, useSelector } from "react-redux";
import friendApi from "../../../api/friendApi";
import { modalSliceAction } from "../../../store/modalSlice";
const ProfileFriend = (props) => {
  const { images, files } = props;

  // Redux
  const dispatch = useDispatch();
  // AccessToken
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const friendInfo = useSelector((state) => state.user.friend);

  if (!friendInfo) return;
  const { name, avatar, username, bio, birthDate, gender, address, _id } =
    friendInfo;

  // Handle Event
  // Handle Delete Friend
  const deleteFriendHandle = async () => {
    dispatch(
      modalSliceAction.setOpenConfirm({
        title: "Hủy kết bạn",
        content: "Bạn chắc chắn hủy kết bạn?",
        onConfirm: confirmHandle,
        isOpenConfirm: true,
      })
    );
  };

  // Handle Delete Friend
  const confirmHandle = async () => {
    try {
      const data = await friendApi.deleteFriend(accessToken, _id);
      toast.success("Xóa thành công");
    } catch (error) {}
  };

  return (
    <div className="profile_friend_container">
      <ToastContainer />
      <div className="profile_friend_container__header">
        <h2>Thông tin bạn bè</h2>
      </div>
      <div className="infor">
        <div className="img_div">
          <div className="contain_img">
            <img className="avt_friend" src={avatar}></img>
          </div>
        </div>
        <p className="friend_name">{name}</p>
        <div className="contain_btn">
          <div className="btn" onClick={deleteFriendHandle}>
            <FontAwesomeIcon className="icon" icon={faTrash} />
            <p>Hủy kết bạn</p>
          </div>
          <div className="btn">
            <FontAwesomeIcon className="icon" icon={faUserGroup} />
            <p>Tạo nhóm</p>
          </div>
          <div className="btn">
            <FontAwesomeIcon className="icon" icon={faBan} />
            <p>Chặn</p>
          </div>
        </div>
        <div className="contain__wrap">
          <div className="contain_title_friend">
            <div className="title_friend">
              <p className="span">Bio:</p>
              <p className="bio_friend">{bio ? bio : "Bạn bè chưa đặt bio"}</p>
            </div>
            <div className="title_friend">
              <p className="span">Tên:</p>
              <p className="name_friend">{name}</p>
            </div>
            <div className="title_friend">
              <p className="span">Số điện thoại:</p>
              <p className="phone_friend">{username}</p>
            </div>
            <div className="title_friend">
              <p className="span">Giới tính:</p>
              <p className="gender_friend">{gender}</p>
            </div>
          </div>
          <div className="contain_media_friend">
            <p>Media</p>
            <div className="contain_media">
              {images
                ? images.map((image) => (
                    <div className="media" key={image._id}>
                      <img src={image.text} alt=""></img>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="contain_files_friends">
            <p className="contain_files_friends__title">File đã gửi</p>
            {files
              ? files.map((file) => (
                  <a href={file.text} className="file_contain" key={file._id}>
                    <div className="file">
                      <div className="file_infor">
                        <p className="file_name">
                          {file.fileName}.{file.type}
                        </p>
                        {/* <p className="size_name">1.50MB</p> */}
                      </div>
                      <div className="file_action">
                        <FontAwesomeIcon className="icon" icon={faDownload} />
                        <FontAwesomeIcon className="icon" icon={faTrash} />
                      </div>
                    </div>
                  </a>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriend;
