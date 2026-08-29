import styles from "./Modal.module.css";

function Modal({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Confirm Delete</h3>
        <p>Are you sure? This action cannot be undone.</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>
            Yes, Delete
          </button>
          <button onClick={onCancel} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
