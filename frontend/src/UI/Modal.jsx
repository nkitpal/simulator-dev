import { useEffect, useRef } from "react";

export default function Modal({ children, openModal, handleCloseModal }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (openModal) {
      return modal.showModal();
    } else {
      modal.close();
    }

    return () => modal.close();
  }, [openModal]);

  return (
    <dialog ref={dialog} onClose={handleCloseModal}>
      {openModal ? children : null}
    </dialog>
  );
}
