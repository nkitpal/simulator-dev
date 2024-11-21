import Modal from "../UI/Modal";

export default function SuccessModal({ message, handleCloseModal, openModal }) {
  return (
    <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
      <h1>Success!!</h1>
      <p>{message}</p>
      <div>
        <button type="button" onClick={handleCloseModal}>
          Okay!
        </button>
      </div>
    </Modal>
  );
}
