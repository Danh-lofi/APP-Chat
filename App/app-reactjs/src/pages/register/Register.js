import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import axiosClients from "../../api/axiosClient";
import "./register.scss";
import { useDispatch } from "react-redux";

import ConfirmOTP from "../confirmOTP/ConfirmOTP";
import { register, registerVerify } from "../../store/userSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authentication from "../../api/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import authApi from "../../api/authApi";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmOTP, setConfirmOTP] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignInSubmit = (response) => {
    if (response) {
      setConfirmOTP(true);
    }
  };

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "visable",
        callback: (response) => {
          onSignInSubmit(response);
        },
      },
      authentication
    );
  };
  const submitHandle = async () => {
    const isConfirm = confirmPassword === password;
    // Xác nhận mật khẩu không chính xác
    if (!isConfirm) {
    toast.error('Nhập mật khẩu không khớp')

      console.log("Password confirmed is fail!");
      return;
    }
    const data = await dispatch(registerVerify(username));
    console.log(data);
    if (data.payload.status === 200) {
      generateRecapcha();
      const appVerifier = window.recaptchaVerifier;
      console.log(`+84${username}`);
      signInWithPhoneNumber(authentication, `+84${username}`, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Tài khoản đã tồn tại
      toast.warning('Tài khoản đã tồn tại!')
    }
  };

  const confirmOTPHandle = (otp) => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        dispatch(register({ username, password })).then((res) => {
          if (res.payload.status === 200) {
            // Đăng kí thành công chuyển trang
            console.log(res.payload.data);
            
            navigate("info");
            
          } else {
            // Đăng kí thật bại
            toast.error('Đăng kí thất bại')
            console.log("Fail!!!");
          }
        });
      })
      .catch((error) => {
        if (error) {
          console.log("error");
          toast.error('Mã OTP không đúng')
        }
      });
  };

  const changeUsernameHandle = (value) => {
    setUsername(value);
  };
  const changePasswordHandle = (value) => {
    setPassword(value);
  };
  const changeConfirmPasswordHandle = (value) => {
    setConfirmPassword(value);
  };
  return <>
             <ToastContainer />
  {!confirmOTP ? (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Register Account</h3>
          <p className="login__title__sub">Get your free Doot account now.</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Số điện thoại"
            type="text"
            placeholder="Nhập số điện thoại..."
            onInput={changeUsernameHandle}
          />
          <InputAuthen
            label="Mật khẩu"
            type="password"
            isPassword
            isRegister
            placeholder="Nhập mật khẩu"
            onInput={changePasswordHandle}
          />
          <InputAuthen
            label="Xác nhận mật khẩu"
            type="password"
            isPassword
            isRegister
            placeholder="Nhập lại mật khẩu..."
            onInput={changeConfirmPasswordHandle}
          />
          <div className="combo-check">
            <div className="checkbox-div">
              <input className="checkbox" type="checkbox"></input>
            </div>

            <label className="agree">
              By registering you agree to the Doot <span> Terms of Use </span>
            </label>
          </div>
        </div>
        <div className="button_authen__wrapper">
          <ButtonAuthen onClick={submitHandle} content="Register" />
        </div>
        <div className="login__descript">
          <div className="line"></div>
          <span>Xác nhận</span>
          <div className="line"></div>
        </div>
        <div id="recaptcha-container"></div>

        <div className="login__link">
          <p>Already have an account ? </p>
          <Link to="/login" className="login__link__text">
            Login
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <ConfirmOTP onSubmit={confirmOTPHandle} username={username} />
  )}
  </>
  
  
};

export default Register;
