import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import ButtonSocial from "../../components/button/ButtonSocial";
import InputAuthen from "../../components/input/InputAuthen";
import axiosClients from "../../api/axiosClient";
import "./register.scss";
import { useDispatch } from "react-redux";
import { register } from "../../store/userSlice";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandle = () => {
    const isConfirm = confirmPassword === password;
    if (!isConfirm) {
      console.log("Password confirmed is fail!");
      return;
    }
    dispatch(register({ username, password })).then((res) => {
      if (res.payload.status === 200) {
        console.log(res.payload.data);
        navigate("/info");
      } else {
        console.log("Fail!!!");
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
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h3 className="login__title__main">Register Account</h3>
          <p className="login__title__sub">Get your free Doot account now.</p>
        </div>
        <div className="login__input">
          <InputAuthen
            label="Email"
            type="text"
            placeholder="Enter Email"
            onInput={changeUsernameHandle}
          />
          <InputAuthen
            label="Password"
            type="password"
            isPassword
            isRegister
            placeholder="Enter your password"
            onInput={changePasswordHandle}
          />
          <InputAuthen
            label="Confirm Password"
            type="password"
            isPassword
            isRegister
            placeholder="Enter your password"
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
          <span>Sign up using</span>
          <div className="line"></div>
        </div>
        <div className="login__btn-link">
          <ButtonSocial type="fb" />
          <ButtonSocial type="tw" />
          <ButtonSocial type="gg" />
        </div>

        <div className="login__link">
          <p>Already have an account ? </p>
          <Link to="/login" className="login__link__text">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
