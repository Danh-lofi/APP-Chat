import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTrash,
  faUserGroup,
  faBan,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "./ProfileGroup.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalSliceAction } from "../../../store/modalSlice";

const ProfileGroup = () => {
  const dispatch = useDispatch();
  // const profileGroup = useSelector((state) => state.group.data);
  // console.log(profileGroup);
  const groupInfo = useSelector((state) => state.user.group);
  if (!groupInfo) return;
  const { nameGroupChat, imgGroupChat, memberChat, adminGroup } = groupInfo;

  const addMemberHandle = () => {
    dispatch(modalSliceAction.setOpen(true));
  };
  return (
    <div className="profile_friend_container">
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
          <div className="btn">
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
          <p>Thành viên nhóm</p>
          <div className="contain_list_tag">
            <div className="tag_member">
              <div className="left_tag">
                <img src="https://www.twago.de/img/2018/default/no-user.png"></img>
                <p className="name_member">Phạm Đăng Khoa</p>
              </div>
              <FontAwesomeIcon
                title="Xóa khỏi nhóm"
                className="icon"
                icon={faTrash}
              />
            </div>
            <div className="tag_member">
              <div className="left_tag">
                <img src="https://www.twago.de/img/2018/default/no-user.png"></img>
                <p className="name_member">Phạm Đăng </p>
              </div>
              <FontAwesomeIcon
                title="Xóa khỏi nhóm"
                className="icon"
                icon={faTrash}
              />
            </div>
            <div className="tag_member">
              <div className="left_tag">
                <img src="https://www.twago.de/img/2018/default/no-user.png"></img>
                <p className="name_member">Phạm Khoa</p>
              </div>
              <FontAwesomeIcon
                title="Xóa khỏi nhóm"
                className="icon"
                icon={faTrash}
              />
            </div>
          </div>
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
