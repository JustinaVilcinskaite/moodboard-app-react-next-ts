import { useState } from "react";
import styles from "./styles.module.css";
import { createFolderByBoardId } from "@/api/folder";
import { validateFolder } from "@/validations/folderValidation";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Message from "../Message/Message";

type FolderModalProps = {
  boardId: string;
  onClose: () => void;
  onFolderSaved: () => Promise<void>;
};

const FolderModal = ({ boardId, onClose, onFolderSaved }: FolderModalProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleCreateFolder = async () => {
    const validationError = validateFolder(title);

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setMessage("");

    try {
      setSubmitting(true);

    //   is this correct, i chnaged it a bit. i do not need trim here
      await createFolderByBoardId(boardId, {title});

      await onFolderSaved();
      onClose();
    } catch (error) {
      console.log("Create folder error", error);
      setMessage("Error creating folder.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Create Folder" onClose={onClose}>
      <div className={styles.form}>
        <label className={styles.formGroup}>
          <span className={styles.label}>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setMessage("");
            }}
          />
        </label>

        {message && <Message text={message} isError={true} />}

        <div className={styles.actions}>
          <Button title="Cancel" onClick={onClose} variant="secondary" />
          <Button
            title="Create Folder"
            onClick={handleCreateFolder}
            isLoading={isSubmitting}
            variant="primary"
          />
        </div>
      </div>
    </Modal>
  );
};

export default FolderModal;
