import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import { deleteBoardById } from "@/api/board";
import Button from "../Button/Button";
import Message from "../Message/Message";

type DeleteBoardModalProps = {
  board: Board;
  onClose: () => void;
  onBoardUpdated: () => Promise<void>;
};

const DeleteBoardModal = ({
  board,
  onClose,
  onBoardUpdated,
}: DeleteBoardModalProps) => {
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleDeleteBoard = async () => {
    try {
      setSubmitting(true);

      await deleteBoardById(board.id);

      await onBoardUpdated();
      onClose();
    } catch (error) {
      console.log("Delete board error", error);
      setMessage("Error deleting board.");
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Delete Board</h2>

          <Button
            // TODO: add an svg icon
            icon="×"
            onClick={onClose}
            variant="icon"
            ariaLabel="Close delete board modal"
          />
        </div>

        <div className={styles.content}>
          <p>
            Are you sure you want to delete <strong>{board.title}</strong>?
          </p>
          <p>This action cannot be undone.</p>

          {message && <Message text={message} isError={isError} />}

          <div className={styles.actions}>
            <Button title="Cancel" onClick={onClose} variant="secondary" />

            <Button
              title="Delete"
              onClick={handleDeleteBoard}
              isLoading={isSubmitting}
              variant="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
