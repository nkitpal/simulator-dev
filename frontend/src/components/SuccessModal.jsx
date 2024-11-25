import Modal from "../UI/Modal";
import styles from "./SuccessModal.module.css"; // Import CSS module for the success modal styles

export default function SuccessModal({ message, handleCloseModal, openModal }) {
  return (
    <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
      <div className={styles.successContent}>
        <h1 className={styles.successTitle}>Success!!</h1>
        <p>{message}</p>
        <div>
          <button
            type="button"
            onClick={handleCloseModal}
            className={styles.closeButton}
          >
            Okay!
          </button>
        </div>
      </div>
    </Modal>
  );
}
