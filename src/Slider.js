import React from "react";
import { ZoomInIcon, ZoomOutIcon } from "./Icons";

const Slider = ({ min, max, step, value, onChange, showZoomIcons }) => {
  return (
    <div className="slider">
      {showZoomIcons ? <ZoomOutIcon /> : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {showZoomIcons ? <ZoomInIcon /> : null}
    </div>
  );
};

export default Slider;
