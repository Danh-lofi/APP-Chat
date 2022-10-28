import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import axiosClients from "../../api/axiosClient";
import authentication from "../../api/firebase";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import InputAuthen from "../../components/input/InputAuthen";
import { existUsername } from "../../store/userSlice";
import ConfirmOTP from "../confirmOTP/ConfirmOTP";
import "./forgot.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const [username, setUsername] = useState();
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
  const changeInputHandle = (value) => {
    setUsername(value);
  };
  const submitHandle = async () => {
    const data = await dispatch(existUsername(username));
    // Xác thực có tài khoản
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
    }
    // Xác thực không có có tài khoản
    if (data.payload.status === 402) {
      console.log("Err");
      toast.error("Số điện thoại không tồn tại");
    }
  };

  const confirmOTPHandle = (otp) => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        // Xác thực thành công
        navigate("reset-password");
      })
      .catch((error) => {
        // Xác thực thất bại
        console.log("error");
        toast.error("Mã OTP sai!!! Vui lòng kiểm tra lại");
      });
  };
  return !confirmOTP ? (
    <div className="forgot">
      <div className="forgot_container">
        <div className="forgot__title">
          <h3 className="forgot__title__main">Quên mật khẩu</h3>
          <p className="forgot__title__sub">Lấy lại mật khẩu với OTP.</p>
        </div>
      </div>
      <div className="forgot__commention">
        <p>Nhập số điện thoại của bạn và hãy đợi ít chút để nhận OTP</p>
      </div>
      <div className="forgot__input">
        <InputAuthen
          label="Số điện thoại"
          type="text"
          placeholder="Nhập số điện thoại..."
          onInput={changeInputHandle}
        />
      </div>
      <div className="button_authen__wrapper">
        <ButtonAuthen content="Lấy lại" onClick={submitHandle} />
      </div>
      <div className="login__link">
        <p>Bạn đã nhớ lại </p>
        <Link to="/login" className="login__link__text">
          Đăng nhập thôi!
        </Link>
      </div>
      <div id="recaptcha-container"></div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <ConfirmOTP onSubmit={confirmOTPHandle} username={username} />
      <ToastContainer />
    </>
  );
};

export default Forgot;
