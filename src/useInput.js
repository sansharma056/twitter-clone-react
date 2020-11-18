import { useState } from "react";

const useInput = (defaultState) => {
  const [state, setState] = useState(defaultState);

  const onChange = (e) => {
    setState(e.target.value);
  };

  return { state, setState, onChange };
};

export default useInput;
