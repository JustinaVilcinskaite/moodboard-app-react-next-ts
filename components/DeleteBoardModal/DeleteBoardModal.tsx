import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import { deleteBoardById } from "@/api/board";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Modal from "../Modal/Modal";

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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Delete Board" onClose={onClose}>
      <div className={styles.content}>
        <p>
          Are you sure you want to delete <strong>{board.title}</strong>?
        </p>
        <p>This action cannot be undone.</p>

        {message && <Message text={message} isError={true} />}

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
    </Modal>
  );
};

export default DeleteBoardModal;
