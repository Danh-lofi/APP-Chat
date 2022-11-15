import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profile, userActions } from "../../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUser,
  faCalendarDay,
  faVenusMars,
  faDownload,
  faTrash,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

import "./profile.scss";
import { modalSliceAction } from "../../store/modalSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  let isLogin = useSelector((state) => state.user.isLoggedIn);
  const { name, avatar, gender, birthDate, bio, username, coverImg } = user;
  const D = new Date(birthDate);
  // Hàm chuyển đổi thành dd/mm/yyyy
  const getFormattedDate = (date) => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return day + "/" + month + "/" + year;
  };
  const date = getFormattedDate(D);

  useEffect(() => {
    if (user) {
      dispatch(profile(user.accessToken)).then((res) => {
        if (res.payload.status === 401) {
          dispatch(userActions.logOut());
          navigate("/login");
        } else {
          console.log(user);
          setUser(res.payload.data.user);
        }
      });
    }
  }, []);

  const [ariaExpanded, setAriaExpanded] = useState("");

  // Mở modal đổi thông tin
  const openChangeProfileModal = () => {
    dispatch(modalSliceAction.setChangeProfileOpen(true));
  };

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <div className="profile__header">
            <div className="header__img_contain">
              <img src={coverImg}></img>
            </div>
            <div className="header__info_and_avt_contain">
              <div className="header__avt_contain">
                <img src={avatar}></img>
              </div>
              <p>{name}</p>
              <div className="update_info" onClick={openChangeProfileModal}>
                <p>Sửa thông tin</p>
              </div>
            </div>
          </div>
          <div className="profile__body">
            <div className="body__info_contain">
              <div className="info__bio">
                <p>{bio}</p>
              </div>
              <div className="info__name">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <p>{name}</p>
              </div>
              {/* Số điện thoại = username */}
              <div className="info__username">
                <FontAwesomeIcon className="icon" icon={faPhone} />
                <p>{username}</p>
              </div>
              <div className="info__birthday">
                <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                <p>{date}</p>
              </div>
              <div className="info__gender">
                <FontAwesomeIcon className="icon" icon={faVenusMars} />
                <p>{gender}</p>
              </div>
            </div>
            <div className="body__media_contain">
              <p>Media</p>
              <div className="media_contain">
                <div className="media__img_contain">
                  <img src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2019/ey-staff-at-event.jpg"></img>
                </div>
              </div>
            </div>
            <div className="body__files_contain">
              <p>Files</p>
              <div className="files__contain">
                <div className="files__file_cotain">
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
              <div className="files__contain">
                <div className="files__file_cotain">
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
      <ToastContainer />
    </>
  );
};

export default Profile;
