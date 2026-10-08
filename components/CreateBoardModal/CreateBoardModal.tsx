import styles from "./styles.module.css";
import { useState } from "react";
import { createBoard } from "@/api/board";
import { validateCreateBoard } from "@/validations/boardValidation";
import Button from "../Button/Button";
import Message from "../Message/Message";

type CreateBoardModalProps = {
  onClose: () => void;
  onBoardCreated: () => Promise<void>;
};

const CreateBoardModal = ({
  onClose,
  onBoardCreated,
}: CreateBoardModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setPublic] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleCreateBoard = async () => {
    const validationError = validateCreateBoard({ title, description });

    if (validationError) {
      setMessage(validationError);
      setError(true);
      return;
    }

    setMessage("");
    setError(false);

    try {
      setSubmitting(true);
      await createBoard({
        title,
        description,
        isPublic,
      });

      await onBoardCreated();
      onClose();
    } catch (error) {
      console.log("Create board error", error);
      setMessage("Error creating board.");
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Create Board</h2>
          <Button
            // TODO: add an svg icon
            icon="×"
            onClick={onClose}
            variant="icon"
            ariaLabel="Close create board modal"
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

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setMessage("");
                setError(false);
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
          {message && <Message text={message} isError={isError} />}

          <div className={styles.actions}>
            <Button title="Cancel" onClick={onClose} variant="secondary" />
            <Button
              title="Create Board"
              onClick={handleCreateBoard}
              isLoading={isSubmitting}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;
