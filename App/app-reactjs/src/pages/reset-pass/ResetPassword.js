import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const changePasswordHandle = (value) => {
    setPassword(value);
  };
  const changeConfirmPasswordHandle = (value) => {
    setConfirmPassword(value);
  };
  const submitHandle = () => {
    const isConfirm = confirmPassword === password;
    if (!isConfirm) {
      console.log("Password confirmed is fail!");
      return;
    }
    console.log(password);
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Quên mật khẩu</h3>
          <p className="login__title__sub">Lấy lại mật khẩu</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Mật khẩu"
            type="password"
            isPassword
            isRegister
            placeholder="Nhập mật khẩu mới"
            onInput={changePasswordHandle}
          />
          <InputAuthen
            label="Xác nhận mật khẩu"
            type="password"
            isPassword
            isRegister
            placeholder="Nhập lại mật khẩu"
            onInput={changeConfirmPasswordHandle}
          />
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen onClick={submitHandle} content="Lấy lại mật khẩu" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
