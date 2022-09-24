import React, { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const changeLoginHandle = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <Login onClick={changeLoginHandle} />
      ) : (
        <Register onClick={changeLoginHandle} />
      )}
    </div>
  );
};

export default Home;
