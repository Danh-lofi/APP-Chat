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
} from "@fortawesome/free-solid-svg-icons";

import "./profile.scss";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let isLogin = useSelector((state) => state.user.isLoggedIn);

  console.log(user);
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

  // useEffect(() => {
  //   toast.success("Đăng nhập thành công");
  // });
  return (
    <>
      {/* <div>{<h3>{user.username}</h3>}</div> */}
      <div className="profile">
        <div className="profile__container">
          <div className="profile__header">
            <div className="header__img_contain">
              <img src="https://genk.mediacdn.vn/139269124445442048/2022/6/7/how-hackers-use-social-media-and-emails-to-hack-virtual-crypto-wallets-1654589109166-16545891098641636949174.png"></img>
            </div>
            <div className="header__info_and_avt_contain">
              <div className="header__avt_contain">
                <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
              </div>
              <p>Nguyễn Hoàng Vũ</p>
            </div>
          </div>
          <div className="profile__body">
            <div className="body__info_contain">
              <div className="info__bio">
                <p>
                  là người có công việc duy trì các hoạt động của hệ thống máy
                  tính cũng như mạng, đảm bảo sao cho chúng luôn trong tình
                  trạng tối ưu nhất.
                </p>
              </div>
              <div className="info__name">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <p>Nguyễn Hoàng Vũ</p>
              </div>
              {/* Số điện thoại = username */}
              <div className="info__username">
                <FontAwesomeIcon className="icon" icon={faPhone} />
                <p>0335047747</p>
              </div>
              <div className="info__birthday">
                <FontAwesomeIcon className="icon" icon={faCalendarDay} />
                <p>05/01/2005</p>
              </div>
              <div className="info__gender">
                <FontAwesomeIcon className="icon" icon={faVenusMars} />
                <p>Bisexual</p>
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
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
                <div className="media__img_contain">
                  <img src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/275000620_3352877038272999_6281116958568140244_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=SQMj4piqytQAX8_9Jax&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8N-m4aWijCA01RMvACYSstuM--wmt6J_D6e_ZrIiAupg&oe=635D7C8F"></img>
                </div>
              </div>
            </div>
            <div className="body__files_contain">
              <p>Files</p>
              <div className="files__contain">
                <div className="files__file_cotain"></div>
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
