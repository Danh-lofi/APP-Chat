import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./changeinfo.scss";
import InputAuthen from "../../input/InputAuthen";
const ChangeInfo = (props) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div className="change__info__container">
      <div className="change__info__overlay"></div>
      <div className="change__info__wrap">
        <div className="change__info__card">
          <div className="change__info__card__header">
            <h4 className="change__info__card__header__title">
              Cập nhật thông tin
            </h4>
            <div className="change__info__close">
              <span>x</span>
            </div>
          </div>
          <div className="change__info__card__body">
            <div className="change__info__card__body__bg">
              <img src={user.coverImg} alt="" />
            </div>
            <div className="change__info__card__body__avatar">
              <FontAwesomeIcon icon={faCamera} />
              <img src={user.avatar} alt="" />
            </div>
            <div className="change__info__card__body__container change__info__card__body__mg">
              <InputAuthen
                label="Họ và tên"
                type="text"
                placeholder="Nhập vào họ tên"
                // onInput={changeNameHandle}
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
                // onChange={(option) => setGender(option.target.value)}
                name="gender"
              >
                <option value="">Chọn giới tính</option>
                <option value="female">Nữ</option>
                <option value="male">Nam</option>
                <option value="other">Khác</option>
              </select>
              <InputAuthen
                label="Ngày sinh"
                type="text"
                isDateTime
                // onInput={changeBirthDayHandle}
              />
            </div>
          </div>
          <div className="change__info__card__footer change__info__card__body__container">
            <button className="change__info__card__footer__cancel">Hủy</button>
            <button className="change__info__card__footer__update">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfo;
