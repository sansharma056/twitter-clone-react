import React from "react";
import { SpinnerIcon } from "./Icons";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <SpinnerIcon />
      </div>
    </div>
  );
};

export default Spinner;
