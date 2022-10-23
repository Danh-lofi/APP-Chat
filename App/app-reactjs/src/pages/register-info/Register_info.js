import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import axiosClients from "../../api/axiosClient";
import "./Register_info.scss";
import { info, registerInfo } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register_info = (props) => {
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.user);
  console.log(username);
  const submitHandle = () => {
    console.log(birthDay + name + gender + bio);
    const user = {
      username,
      name,
      birthDate: birthDay,
      gender,
      bio,
    };
    console.log(user);
    dispatch(registerInfo({ user })).then((res) => {
      console.log(res);
      if (res.payload.status === 200) {
        navigate("/profile");
      } else {
      }
    });
  };

  const changeNameHandle = (value) => {
    setName(value);
  };
  const changeBirthDayHandle = (value) => {
    setBirthDay(value);
  };

  const changeBioHandle = (value) => {
    setBio(value);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Thông tin tài khoản</h3>
          <p className="login__title__sub">
            Cập nhật tài khoản SUARCHAT miễn phí của bạn ngay bây giờ.
          </p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Họ và tên"
            type="text"
            placeholder="Nhập vào họ tên"
            onInput={changeNameHandle}
          />

          <InputAuthen
            label="Ngày sinh"
            type="text"
            isDateTime
            onInput={changeBirthDayHandle}
          />

          <label className="input-authen__label">Giới tính</label>
          <select
            className="input-authen__input"
            onChange={(option) => setGender(option.target.value)}
            name="gender"
          >
            <option value="">Chọn giới tính</option>
            <option value="female">Nữ</option>
            <option value="male">Nam</option>
            <option value="other">Khác</option>
          </select>

          <InputAuthen
            label="Mô tả bản thân"
            type="text"
            placeholder="Nhập mô tả bản thân"
            onInput={changeBioHandle}
          />

          <div className="button_authen__wrapper">
            <ButtonAuthen content="Cập nhật" onClick={submitHandle} />
          </div>

          <div className="button_authen__wrapper">
            <ButtonAuthen isSkip content="Bỏ qua >>" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register_info;
