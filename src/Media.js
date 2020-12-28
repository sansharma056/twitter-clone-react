import React from "react";

const Media = ({ src }) => {
  return (
    <div className="media-wrapper">
      <div className="media">
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default Media;
