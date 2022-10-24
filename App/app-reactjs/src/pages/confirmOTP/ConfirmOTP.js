import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import InputAuthen from "../../components/input/InputAuthen";
import "./confirmOTP.scss";



const ConfirmOTP = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = props.username;

  const [OTP, setOTP] = useState("");
  const changeOTPHandle = (value) => {
    setOTP(value);
  };
  const submitHandle = () => {
    props.onSubmit(OTP);
  };
  return (
    <div className="confirmOTP_container">
      <div className="confirmOTP__title">
        <h3 className="confirmOTP__title__main">Xác nhận mã OTP</h3>
        <p className="confirmOTP__title__sub">
          Mã xác thực đã được gửi về số điện thoại {username}. Vui lòng xác thực để tiếp tục.
        </p>
      </div>
      <div className="confirmOTP__input">
        <InputAuthen
          label="Mã xác thực"
          type="text"
          placeholder="Nhập mã OTP"
          onInput={changeOTPHandle}
        />
      </div>

      <div className="button_authen__wrapper">
        <ButtonAuthen onClick={submitHandle} content="Xác nhận" />
      </div>
      <div className="confirmOTP__resend__link">
        <p>Không nhận được mã ? </p>
        <Link to="/confirmOTP" className="confirmOTP__resend__link__text">
          Gửi lại
        </Link>
      </div>
    </div>
  );
};
export default ConfirmOTP;
