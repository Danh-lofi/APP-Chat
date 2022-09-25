import React from "react";
import { Link } from "react-router-dom";
import "./login.scss";
const Login = (props) => {
  return (
    <div>
      <Link to="/register" className="text">
        Register
      </Link>
    </div>
  );
};

export default Login;
