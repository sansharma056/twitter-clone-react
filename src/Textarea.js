import React from "react";

const Textarea = ({ labelName, id, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{labelName}</label>
      <textarea id={id} value={value} onChange={onChange}></textarea>
    </div>
  );
};

export default Textarea;
