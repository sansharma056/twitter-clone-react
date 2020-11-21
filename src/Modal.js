import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    document.body.style.overflow = "hidden";
    document.body.style.marginRight = "12px";

    return () => {
      modalRoot.removeChild(elRef.current);
      document.body.style.overflow = "auto scroll";
      document.body.style.marginRight = "0px";
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
