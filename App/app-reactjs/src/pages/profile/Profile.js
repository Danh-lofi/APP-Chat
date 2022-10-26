import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profile, userActions } from "../../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let isLogin = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (user) {
      dispatch(profile(user.accessToken)).then((res) => {
        if (res.payload.status === 401) {
          dispatch(userActions.logOut());
          navigate("/login");
        } else {
          console.log(user);
          setUser(res.payload.data.user);
        }
      });
    }
  }, []);

  // useEffect(() => {
  //   toast.success("Đăng nhập thành công");
  // });
  return (
    <>
      {/* <div>{<h3>{user.username}</h3>}</div> */}
      <div>profile</div>
      <ToastContainer />
    </>
  );
};

export default Profile;
