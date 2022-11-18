import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserGroup,
  faBan,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

import "./ProfileFriend.scss";
import { useSelector } from "react-redux";
const ProfileFriend = () => {
  const friendInfo = useSelector((state) => state.user.friend);
  if (!friendInfo) return;
  const { name, avatar, username, bio, birthDate, gender, address } =
    friendInfo;
  console.log(gender);
  console.log(friendInfo.gender);
  return (
    <div className="profile_friend_container">
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
          <div className="btn">
            <FontAwesomeIcon className="icon" icon={faTrash} />
            <p>Hủy kết bạn</p>
          </div>
          <div className="btn">
            <FontAwesomeIcon className="icon" icon={faUserGroup} />
            <p>Thêm vào nhóm</p>
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
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
              <div className="media">
                <img src={avatar} alt=""></img>
              </div>
            </div>
          </div>
          <div className="contain_files_friends">
            <p className="contain_files_friends__title">File đã gửi</p>
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
    </div>
  );
};

export default ProfileFriend;
