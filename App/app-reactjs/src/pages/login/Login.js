import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import { login, profile } from "../../store/userSlice";
import "./login.scss";

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
      if (res.payload.status === 200) {
        navigate("/profile");
      } else {
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
          <h3 className="login__title__main">Chào mừng bạn !</h3>
          <p className="login__title__sub">Đăng nhập để sử dụng SUARCHAT</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại"
            onInput={changeUsernameHandle}
          />
          <InputAuthen
            label="Mật khẩu"
            type="password"
            isPassword
            placeholder="Nhập mật khẩu"
            onInput={changePasswordHandle}
          />
          <div className="combo-check">
            <div className="checkbox-div">
              <input className="checkbox" type="checkbox"></input>
            </div>

            <label className="remember">Nhớ mật khẩu</label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen content="Đăng nhập" onClick={submitHandle} />
        </div>
        {/* <div className="login__descript">
          <div className="line"></div>
          <span>với</span>
          <div className="line"></div>
        </div>
        <div className="login__btn-link">
          <ButtonSocial type="fb" />
          <ButtonSocial type="tw" />
          <ButtonSocial type="gg" />
        </div>
        <div className="login__link">
          <p>Bạn chưa có tài khoản ? </p>
          <Link to="/register" className="login__link__text">
            Đăng kí
          </Link>
        </div> */}

        {/* test thui mí nữa xóa */}
        <Link to="/confirmOTP" className="login__link__text">
          get OTP Confirm UI
        </Link>
      </div>
    </div>
  );
};

export default Login;
