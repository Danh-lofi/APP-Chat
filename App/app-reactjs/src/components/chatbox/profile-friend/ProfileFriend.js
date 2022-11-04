import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserGroup,
  faBan,
  faDownload
} from "@fortawesome/free-solid-svg-icons";


import "./ProfileFriend.scss";
const ProfileFriend = () => {
  return (
  <div className="profile_friend_container">
    <div className="header">
      <h2>Thông tin bạn bè</h2>
    </div>
    <div className="infor">
      <div className="img_div">
        <div className="contain_img">
          <img className="avt_friend" src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"></img>
        </div>
      </div>
      <p className="friend_name">Trần Phúc Tông</p>
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
      <div className="contain_title_friend">
        <div className="title_friend">
          <p className="span">Bio:</p>
          <p className="bio_friend">Em ăn cơm chưa Em ăn cơm chưa
          Em ăn cơm chưa Em ăn cơm chưa Em ăn cơm chưa Em ăn cơm chưa
          Em ăn cơm chưa Em ăn cơm chưa</p>
        </div>
        <div className="title_friend">
          <p className="span">Tên:</p>
          <p className="name_friend">Trần Phúc Tông</p>
        </div>
        <div className="title_friend">
          <p className="span">Số điện thoại:</p>
          <p className="phone_friend">0123456789</p>
        </div>
        <div className="title_friend">
          <p className="span">Giới tính:</p>
          <p className="gender_friend">Khác</p>
        </div>
      </div>
      <div className="contain_media_friend">
        <p>Media</p>
        <div className="contain_media">
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
            </div>
            <div className="media">
              <img src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/313427477_1241568653089342_3873921538602941090_n.png?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ffl5DpotxuQAX9RvGQ5&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDbYkGzZimmtorYdPSkXpEcezoM8ql3p3uphDowXK4gVg&oe=636655A7"></img>
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

export default ProfileFriend;
