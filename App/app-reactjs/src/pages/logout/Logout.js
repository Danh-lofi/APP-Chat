import React from "react";
import { Link } from "react-router-dom";
import ButtonAuthen from "../../components/button/ButtonAuthen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./logout.scss";
const Logout = (props) => {
    return (
        <div className="logout">
            <div className="logout__container">
                <div className="logout__user__icon">
                    <FontAwesomeIcon className="icon" icon={faUser} />
                </div>
                <div className="logout__title">
                    <h3 className="logout__title__main">You are Logged Out</h3>
                    <p className="login__title__sub">Thanks for using <b>Doot</b>.</p>
                </div>
                <div>
                    <Link to="/login"><ButtonAuthen content="Sign In"/></Link>
                </div>
            </div>
        </div>
    );
}
export default Logout;