import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import authApi from "../../api/authApi";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import InputAuthen from "../../components/input/InputAuthen";
import { userActions } from "../../store/userSlice";
import "./changepassword.scss";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.user.user);
  const username = user.username;
  console.log();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set old pw
  const changeOldPasswordHandle = (value) => {
    setOldPassword(value);
  };
  // set new pw
  const changePasswordHandle = (value) => {
    setPassword(value);
  };
  // set confirm pw
  const changeConfirmPasswordHandle = (value) => {
    setConfirmPassword(value);
  };
  // Cancel
  const cancelHandle = () => {
    dispatch(userActions.setLogin());
    navigate("/profile");
  };
  //   submit
  const submitHandle = async () => {
    const isConfirm = confirmPassword === password;
    if (!isConfirm) {
      toast.error("Mật khẩu không khớp! Vui lòng xác nhận lại");
      return;
    }
    let data;
    try {
      data = await authApi.changePassword(username, oldPassword, password);
    } catch (error) {
      toast.error(error.response.data);
    }

    if (data.status === 200) {
      // Thành công chuyển sang trang login thông báo
      toast.success("Cập nhật thành công");

      setTimeout(() => {
        dispatch(userActions.logOut());
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Đổi mật khẩu</h3>
          <img
            className="change-password__avatar"
            src="https://s120-ava-talk.zadn.vn/b/9/b/a/6/120/473b8d61137b99d8000663d47e7437c9.jpg"
            alt="avt"
          />
        </div>
        <div className="login__input">
          <InputAuthen
            label="Mật khẩu cũ"
            type="password"
            isPassword
            isRegister
            placeholder="Nhập mật khẩu cũ"
            onInput={changeOldPasswordHandle}
          />
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
        <div className="change-password__button-container">
          <div className="change-password__button-wrap">
            <ButtonAuthen onClick={submitHandle} content="Lưu" />
          </div>
          <div className="change-password__button-wrap">
            <ButtonAuthen isSkip onClick={cancelHandle} content="Hủy bỏ" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ChangePassword;
