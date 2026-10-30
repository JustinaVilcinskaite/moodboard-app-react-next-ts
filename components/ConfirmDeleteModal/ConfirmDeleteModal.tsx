import { useState } from "react";
import styles from "./styles.module.css";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Message from "../Message/Message";

type ConfirmDeleteModalProps = {
  title: string;
  itemName: string;
  warning: string;
  errorMessage: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const ConfirmDeleteModal = ({
  title,
  itemName,
  warning,
  errorMessage,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setSubmitting(true);

      await onConfirm();
      onClose();
    } catch (error) {
      console.log("Delete error", error);
      setMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <div className={styles.content}>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <p>{warning}</p>

        {message && <Message text={message} isError={true} />}

        <div className={styles.actions}>
          <Button title="Cancel" onClick={onClose} variant="secondary" />

          <Button
            title="Delete"
            onClick={handleDelete}
            isLoading={isSubmitting}
            variant="danger"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
