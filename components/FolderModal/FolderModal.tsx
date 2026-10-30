import { useState } from "react";
import styles from "./styles.module.css";
import { createFolderByBoardId, updateFolderById } from "@/api/folder";
import { validateFolder } from "@/validations/folderValidation";
import type { Folder } from "@/types/folder";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Message from "../Message/Message";

type FolderModalProps = {
  boardId: string;
  folder?: Folder;
  onClose: () => void;
  onFolderSaved: () => Promise<void>;
};

const FolderModal = ({
  boardId,
  folder,
  onClose,
  onFolderSaved,
}: FolderModalProps) => {
  const isEditing = !!folder;

  const [title, setTitle] = useState(folder?.title || "");
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSaveFolder = async () => {
    const validationError = validateFolder(title);

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setMessage("");

    try {
      setSubmitting(true);

      if (folder) {
        await updateFolderById(folder.id, { title });
      } else {
        await createFolderByBoardId(boardId, { title });
      }

      await onFolderSaved();
      onClose();
    } catch (error) {
      console.log("Save folder error", error);
      setMessage(
        isEditing ? "Error renaming folder." : "Error creating folder.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={isEditing ? "Rename Folder" : "Create Folder"}
      onClose={onClose}
    >
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
            title={isEditing ? "Save Changes" : "Create Folder"}
            onClick={handleSaveFolder}
            isLoading={isSubmitting}
            variant="primary"
          />
        </div>
      </div>
    </Modal>
  );
};

export default FolderModal;
