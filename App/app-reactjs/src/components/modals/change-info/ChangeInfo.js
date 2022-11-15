import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./changeinfo.scss";
import InputAuthen from "../../input/InputAuthen";
import { modalSliceAction } from "../../../store/modalSlice";
import userApi from "../../../api/userApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userActions } from "../../../store/userSlice";

const ChangeInfo = (props) => {
  // Ref
  const avatarRef = useRef();
  //
  const [user, setUser] = useState(useSelector((state) => state.user.user));

  // State
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [gender, setGender] = useState(user.gender);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [type, setType] = useState();
  const [fileName, setFileName] = useState();

  // Format date
  const birthDateFormat = new Date(birthDate);
  const year = birthDateFormat.getFullYear();
  const date =
    birthDateFormat.getDate() < 10
      ? "0" + birthDateFormat.getDate()
      : birthDateFormat.getDate();
  const month =
    birthDateFormat.getMonth() + 1 < 10
      ? "0" + (birthDateFormat.getMonth() + 1)
      : birthDateFormat.getMonth() + 1;
  //

  const dispatch = useDispatch();

  let isOpenChangeProfile = useSelector(
    (state) => state.modal.isChangeProfileModal
  );

  // Ẩn modal
  const hideModal = () => {
    // Action đến redux
    dispatch(modalSliceAction.setChangeProfileOpen(false));
  };

  // Hàm xử lí event
  // Name
  const changeNameHandle = (value) => {
    setName(value);
  };
  // Open file
  const openInputFileHandle = () => {
    avatarRef.current.click();
  };
  // Avatar
  const changeAvatarHandle = (e) => {
    const name = e.target.files[0].name;
    const lastDot = name.lastIndexOf(".");

    const fileName = name.substring(0, lastDot);
    const type = name.substring(lastDot + 1);
    setFileName(fileName);
    setType(type);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
  };
  // Date
  const changeBirthDateHandle = (e) => {
    if (!e.target["validity"].valid) return;
    const dt = e.target["value"];
    setBirthDate(dt);
  };
  // submit
  const submitHandle = async () => {
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const data = {
      name,
      gender,
      avatar,
      fileName,
      type,
      birthDate,
    };
    try {
      const res = await userApi.changeProfile(accessToken, data);
      props.onLoading(true);
      if (res.status === 200) {
        props.onLoading(false);
        toast.success("Cập nhật thành công!!!");
        setTimeout(() => {
          dispatch(userActions.changeInfo(res.data.user));
          dispatch(modalSliceAction.setChangeProfileOpen(false));
        }, 2000);
      }
    } catch (error) {
      toast.success("Cập nhật thất bại!!!");
    }
  };
  return (
    <div
      className={`change__info__container ${
        isOpenChangeProfile ? "open" : "close"
      }`}
    >
      <ToastContainer />
      <div className="change__info__overlay" onClick={hideModal}></div>
      <div className="change__info__wrap">
        <div className="change__info__card">
          <div className="change__info__card__header">
            <h4 className="change__info__card__header__title">
              Cập nhật thông tin
            </h4>
            <div className="change__info__close" onClick={hideModal}>
              <span>x</span>
            </div>
          </div>
          <div className="change__info__card__body">
            <div className="change__info__card__body__bg">
              <img src={user.coverImg} alt="" />
            </div>
            <div className="change__info__card__body__avatar">
              <FontAwesomeIcon icon={faCamera} onClick={openInputFileHandle} />
              <div className="change__info__card__body__avatar__img">
                <img src={avatar} alt="" />
              </div>
              <input
                type="file"
                ref={avatarRef}
                onChange={changeAvatarHandle}
              />
            </div>
            <div className="change__info__card__body__container change__info__card__body__mg">
              <InputAuthen
                label="Họ và tên"
                type="text"
                placeholder="Nhập vào họ tên"
                value={name}
                onInput={changeNameHandle}
              />
            </div>
            <div className="change__info__card__body__line"></div>
            <div className="change__info__card__body__container">
              <h4 className="change__info__card__body__title">
                Thông tin cá nhân
              </h4>
              <label className="input-authen__label">Giới tính</label>
              <select
                className="input-authen__input"
                onChange={(option) => setGender(option.target.value)}
                name="gender"
              >
                <option value="">Chọn giới tính</option>
                <option selected={gender === "female"} value="female">
                  Nữ
                </option>
                <option selected={gender === "male"} value="male">
                  Nam
                </option>
                <option selected={gender === "other"} value="other">
                  Khác
                </option>
              </select>
              <div className="input-authen">
                <label className="input-authen__label">Ngày sinh</label>
                <input
                  type="date"
                  value={`${year}-${month}-${date}`}
                  className="input-authen__input"
                  onChange={changeBirthDateHandle}
                />
              </div>
            </div>
          </div>
          <div className="change__info__card__footer change__info__card__body__container">
            <button
              className="change__info__card__footer__cancel"
              onClick={hideModal}
            >
              Hủy
            </button>
            <button
              className="change__info__card__footer__update"
              onClick={submitHandle}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfo;
