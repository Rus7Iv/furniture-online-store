import React from "react";
import styles from "./ModalConfirmation.module.css";

const ModalConfirmation = ({ message, input, onConfirm, onCancel }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {input && <div>{input}</div>}
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onConfirm}
            className="btns"
            style={{ width: "140px" }}
          >
            Да
          </button>
          <button
            onClick={onCancel}
            className="btns"
            style={{ width: "140px" }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
