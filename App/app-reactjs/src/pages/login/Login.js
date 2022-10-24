import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import { login, profile } from "../../store/userSlice";
import "./login.scss";
import authApi from "../../api/authApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(profile(user.accessToken)).then((res) => {
        if (res.payload.status === 200) navigate("/profile");
      });
    }
  }, []);


  const submitHandle = () => {
    dispatch(login({ username, password })).then((res) => {
      // Đăng nhập thành công
      if (res.payload.status === 200) {
        navigate("/profile");
      }
      // Đăng nhập thất bại
      if (res.payload.status === 401) {
        toast.error("Số điện thoại hoặc mật khẩu sai. Vui lòng đăng nhập lại!!!");
      }
    });
  };


  const changeUsernameHandle = (value) => {
    setUsername(value);
  };
  const changePasswordHandle = (value) => {
    setPassword(value);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Welcome Back !</h3>
          <p className="login__title__sub">Sign in to continue to Doot.</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Username"
            type="text"
            placeholder="Enter your phone"
            onInput={changeUsernameHandle}
          />
          <InputAuthen
            label="Password"
            type="password"
            isPassword
            placeholder="Enter your password"
            onInput={changePasswordHandle}
          />
          <div className="combo-check">
            <div className="checkbox-div">
              <input className="checkbox" type="checkbox"></input>
            </div>

            <label className="remember">Remember me</label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen content="Log in" onClick={submitHandle} />
        </div>
        <ToastContainer />
    
        <div className="login__descript">
          <div className="line"></div>
          <span>Sign in with</span>
          <div className="line"></div>
        </div>
        <div className="login__btn-link">
          <ButtonSocial type="fb" />
          <ButtonSocial type="tw" />
          <ButtonSocial type="gg" />
        </div>
        <div className="login__link">
          <p>Don't have an account ? </p>
          <Link to="/register" className="login__link__text">
            Register
          </Link>
        </div>

        {/* test thui mí nữa xóa */}
        <Link to="/confirmOTP" className="login__link__text">
          get OTP Confirm UI
        </Link>
      </div>
    </div>
  );
};

export default Login;
