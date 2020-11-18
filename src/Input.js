import React from "react";

const Input = ({ labelName, type, id, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{labelName}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
