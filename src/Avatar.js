import React from "react";
import defaultImage from "./default_profile_75_75.png";
const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src ? src : defaultImage} alt="Avatar" />
    </div>
  );
};

export default Avatar;
