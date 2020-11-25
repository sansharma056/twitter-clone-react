import React from "react";

const Avatar = ({ url }) => {
  return (
    <div className="avatar">
      <img src={url} alt="Avatar" />
    </div>
  );
};

export default Avatar;
