import type { ReactNode } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <Button
            // TODO: add an svg icon
            icon="×"
            onClick={onClose}
            variant="icon"
            ariaLabel="Close modal"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
