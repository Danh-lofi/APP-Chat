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
    }
  };
  const confirmOTPHandle = (otp) => {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        navigate("reset-password");
        //  axiosClients.resetPassword({ username, password }).then((res) => {
        //    if (res.payload.status === 200) {
        //      console.log(res.payload.data);
        //      navigate("info");
        //    } else {
        //      console.log("Fail!!!");
        //    }
        //  });
      })
      .catch((error) => {
        if (error) {
          console.log("error");
        }
      });
  };
  return !confirmOTP ? (
    <div className="forgot">
      <div className="forgot_container">
        <div className="forgot__title">
          <h3 className="forgot__title__main">Reset Password</h3>
          <p className="forgot__title__sub">Reset Password with Doot.</p>
        </div>
      </div>
      <div className="forgot__commention">
        <p>Enter your Phone number and instructions will be sent to you!</p>
      </div>
      <div className="forgot__input">
        <InputAuthen
          label="Phone number"
          type="text"
          placeholder="Enter your phone"
          onInput={changeInputHandle}
        />
      </div>
      <div className="button_authen__wrapper">
        <ButtonAuthen content="Reset" onClick={submitHandle} />
      </div>
      <div className="login__link">
        <p>Remember It ? </p>
        <Link to="/login" className="login__link__text">
          Login
        </Link>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  ) : (
    <ConfirmOTP onSubmit={confirmOTPHandle} username={username} />
  );
};

export default Forgot;
