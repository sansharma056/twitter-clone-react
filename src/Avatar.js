import React from "react";
import defaultImage from "./default_profile_75_75.png";
import defaultImageMedium from "./default_profile_128_128.png";
import defaultImageLarge from "./default_profile_400_400.png";

const Avatar = ({ src, size }) => {
  const defaultPicSrc = function (size) {
    switch (size) {
      case "large":
        return defaultImageLarge;
      case "medium":
        return defaultImageMedium;
      default:
        return defaultImage;
    }
  };

  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img src={src ? src : defaultPicSrc(size)} alt="" />
      </div>
    </div>
  );
};

export default Avatar;
