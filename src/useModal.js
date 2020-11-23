import { useState } from "react";

const useModal = (defaultState) => {
  const [isModalVisible, updateShowModal] = useState(defaultState);

  function toggleModal() {
    updateShowModal(!isModalVisible);
  }

  return { isModalVisible, toggleModal };
};

export default useModal;
