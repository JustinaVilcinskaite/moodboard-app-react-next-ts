import { useState } from "react";
import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";
import { createImageByUrl } from "@/api/image";
import { validateImage } from "@/validations/imageValidation";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Message from "../Message/Message";

type AddImageModalProps = {
  boardId: string;
  folders: Folder[];
  initialFolderId: string | null;
  onClose: () => void;
  onImageAdded: () => Promise<void>;
};

const AddImageModal = ({
  boardId,
  folders,
  initialFolderId,
  onClose,
  onImageAdded,
}: AddImageModalProps) => {
  const [url, setUrl] = useState("");

  const [folderId, setFolderId] = useState(
    initialFolderId ?? (folders.length === 1 ? folders[0].id : ""),
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const showFolderSelect = initialFolderId === null && folders.length > 1;

  const handleAddImage = async () => {
    const validationError = validateImage({ url, folderId });

    if (validationError) {
      setMessage(validationError);
      return;
    }
    setMessage("");

    try {
      setSubmitting(true);

      await createImageByUrl(boardId, {
        url,
        folderId,
      });

      await onImageAdded();
      onClose();
    } catch (error) {
      console.log("Add image error", error);
      setMessage("Error adding image.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Add Image" onClose={onClose}>
      <div className={styles.form}>
        <label className={styles.formGroup}>
          <span className={styles.label}>Image URL</span>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setMessage("");
            }}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {showFolderSelect && (
          <label className={styles.formGroup}>
            <span className={styles.label}>Folder</span>
            <select
              value={folderId}
              onChange={(e) => {
                setFolderId(e.target.value);
                setMessage("");
              }}
            >
              <option value="">Select a folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.title}
                </option>
              ))}
            </select>
          </label>
        )}

        {message && <Message text={message} isError={true} />}

        <div className={styles.actions}>
          <Button title="Cancel" onClick={onClose} variant="secondary" />
          <Button
            title="Add Image"
            onClick={handleAddImage}
            isLoading={isSubmitting}
            variant="primary"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddImageModal;
