import styles from "./styles.module.css";
import { useState } from "react";
import { Board } from "@/types/board";
import { createBoard, updateBoardById } from "@/api/board";
import { validateBoard } from "@/validations/boardValidation";
import Button from "../Button/Button";
import Message from "../Message/Message";

type BoardModalProps = {
  board?: Board;
  onClose: () => void;
  onBoardSaved: () => Promise<void>;
};

const BoardModal = ({ board, onClose, onBoardSaved }: BoardModalProps) => {
  const isEditing = !!board;

  const [title, setTitle] = useState(board?.title || "");
  const [description, setDescription] = useState(board?.description || "");
  const [isPublic, setPublic] = useState(board?.isPublic || false);

  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSaveBoard = async () => {
    const validationError = validateBoard({ title, description });

    if (validationError) {
      setMessage(validationError);

      return;
    }

    setMessage("");

    try {
      setSubmitting(true);

      if (board) {
        await updateBoardById(board.id, {
          title,
          description,
          isPublic,
        });
      } else {
        await createBoard({
          title,
          description,
          isPublic,
        });
      }

      await onBoardSaved();
      onClose();
    } catch (error) {
      console.log("Save board error", error);
      setMessage(isEditing ? "Error updating board." : "Error creating board.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isEditing ? "Edit Board" : "Create Board"}</h2>
          <Button
            // TODO: add an svg icon
            icon="×"
            onClick={onClose}
            variant="icon"
            ariaLabel="Close board modal"
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
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setMessage("");
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <p className={styles.label}>Visibility</p>
            <div className={styles.visibilityOptions}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => {
                    setPublic(false);
                  }}
                />
                Private
              </label>

              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => {
                    setPublic(true);
                  }}
                />
                Public
              </label>
            </div>
          </div>
          {/* TODO: show validation errors under the related inputs */}
          {message && <Message text={message} isError={true} />}

          <div className={styles.actions}>
            <Button title="Cancel" onClick={onClose} variant="secondary" />
            <Button
              title={isEditing ? "Save Changes" : "Create Board"}
              onClick={handleSaveBoard}
              isLoading={isSubmitting}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
