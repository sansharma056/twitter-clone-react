import React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<FocusLock>{children}</FocusLock>, elRef.current);
};

export default Modal;
