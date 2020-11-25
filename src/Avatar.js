import React from "react";

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="Avatar" />
    </div>
  );
};

export default Avatar;
