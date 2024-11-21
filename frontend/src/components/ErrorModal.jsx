import Modal from "../UI/Modal";

export default function ErrorModal({ message, handleCloseModal, openModal }) {
  return (
    <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
      <h1>Error Occurred!!</h1>
      <p>{message}</p>
      <p>Please reload page or visit later</p>
      <p>Sorry for inconvenience</p>
      <div>
        <button type="button" onClick={handleCloseModal}>
          Okay!
        </button>
      </div>
    </Modal>
  );
}
