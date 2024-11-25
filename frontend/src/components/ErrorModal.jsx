import Modal from "../UI/Modal";
import styles from "./ErrorModal.module.css"; // Import updated CSS

export default function ErrorModal({ message, handleCloseModal, openModal, block }) {
  return (
    <Modal openModal={openModal} handleCloseModal={handleCloseModal}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>Error Occurred!!</h1>
        <p>{message}</p>
        {!block && <><p>Please reload the page or try again later.</p>
          <p>Sorry for the inconvenience.</p></>}
        
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
