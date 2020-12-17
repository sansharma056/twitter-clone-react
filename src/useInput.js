import { useState } from "react";

const useInput = (defaultState) => {
  const [state, setState] = useState(defaultState);
  const [isTouched, setIsTouched] = useState(false);

  const onChange = (e) => {
    setState(e.target.value);
    setIsTouched(true);
  };

  return { state, setState, onChange, isTouched };
};

export default useInput;
