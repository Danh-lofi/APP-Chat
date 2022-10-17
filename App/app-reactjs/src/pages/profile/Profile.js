import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div>
      <h3>{user.username}</h3>
    </div>
  );
};

export default Profile;
