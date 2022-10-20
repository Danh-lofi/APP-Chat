import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profile } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    if (user) {
      dispatch(profile(user.accessToken)).then((res) => {
        if (res.payload.status === 401) {
          navigate("/login");
        } else {
          console.log(res);
          setUser(res.payload.data.user);
        }
      });
    }
  }, []);
  return <div>{<h3>{user.username}</h3>}</div>;
};

export default Profile;
