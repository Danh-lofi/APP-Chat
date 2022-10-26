import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./logout.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = (props) => {
  useEffect(() => {
    toast.success("Đăng xuất thành công");
  }, []);
  return (
    <div className="logout">
      <ToastContainer />
      <div className="logout__container">
        <div className="logout__user__icon">
          <FontAwesomeIcon className="icon" icon={faUser} />
        </div>
        <div className="logout__title">
          <h3 className="logout__title__main">Bạn đã đăng xuất</h3>
          <p className="login__title__sub">
            Cảm ơn bạn đã sử dụng <b>SUARCHAT</b>.
          </p>
        </div>
        <div>
          <Link to="/login">
            <ButtonAuthen content="Đăng nhập" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Logout;
