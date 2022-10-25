import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import axiosClients from "../../api/axiosClient";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.user);
  const changePasswordHandle = (value) => {
    setPassword(value);
  };
  const changeConfirmPasswordHandle = (value) => {
    setConfirmPassword(value);
  };
  const submitHandle = async () => {
    const isConfirm = confirmPassword === password;
    if (!isConfirm) {
      toast.error("Mật khẩu không khớp! Vui lòng xác nhận lại");
      return;
    }
    const data = await authApi.resetPassword(username, password);
    console.log(data);

    if (data.status === 200) {
      // Thành công chuyển sang trang login thông báo
      toast.success("Cập nhật thành công");
      setTimeout(() => navigate("/login"), 1000);
    }
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
