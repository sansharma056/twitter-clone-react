import React from "react";

const Input = ({ labelName, type, id, value, onChange, isInvalid }) => {
  return (
    <div
      className={`input-group ${isInvalid ? "input-group-invalid" : null}`}
      id={`input-group-${id}`}
    >
      <label htmlFor={id}>{labelName}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
