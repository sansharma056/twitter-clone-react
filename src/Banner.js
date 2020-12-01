import React from "react";
import defaultBanner from "./default_banner_600_200.png";
const Banner = ({ src }) => {
  return (
    <div className="banner">
      <img src={src ? src : defaultBanner} alt="Banner" />
    </div>
  );
};

export default Banner;
