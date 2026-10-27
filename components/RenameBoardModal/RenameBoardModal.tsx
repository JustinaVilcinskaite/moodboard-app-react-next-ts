import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import { updateBoardById } from "@/api/board";
import { validateRenameBoard } from "@/validations/boardValidation";
import Button from "../Button/Button";
import Message from "../Message/Message";

type RenameBoardModalProps = {
  board: Board;
  onClose: () => void;
  onBoardUpdated: () => Promise<void>;
};

const RenameBoardModal = ({
  board,
  onClose,
  onBoardUpdated,
}: RenameBoardModalProps) => {
  const [title, setTitle] = useState(board.title);
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleRenameBoard = async () => {
    const validationError = validateRenameBoard({ title });

    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }

    try {
      setSubmitting(true);

      await updateBoardById(board.id, {
        title,
      });

      await onBoardUpdated();
      onClose();
    } catch (error) {
      console.log("Rename board error", error);
      setMessage("Error renaming board.");
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Rename Board</h2>

          <Button
            // TODO: add an svg icon
            icon="×"
            onClick={onClose}
            variant="icon"
            ariaLabel="Close rename board modal"
          />
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setMessage("");
                setError(false);
              }}
            />
          </div>

          {message && <Message text={message} isError={isError} />}

          <div className={styles.actions}>
            <Button title="Cancel" onClick={onClose} variant="secondary" />

            <Button
              title="Save"
              onClick={handleRenameBoard}
              isLoading={isSubmitting}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameBoardModal;
