import styles from "./styles.module.css";
import { useState } from "react";
import type { Image } from "@/types/image";
import type { Folder } from "@/types/folder";
import { updateImageById } from "@/api/image";
import { validateImageUpdate } from "@/validations/imageValidation";

import Button from "../Button/Button";
import Message from "../Message/Message";

type ImageDetailsPanelProps = {
  image: Image;
  folders: Folder[];
  isOwner: boolean;
  onClose: () => void;
  onImageUpdated: () => Promise<void>;
};

const ImageDetailsPanel = ({
  image,
  folders,
  isOwner,
  onClose,
  onImageUpdated,
}: ImageDetailsPanelProps) => {
  const [note, setNote] = useState(image.note);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const currentFolder = folders.find((folder) => folder.id === image.folderId);

  const handleSaveImage = async () => {
    const validationError = validateImageUpdate({ note });

    if (validationError) {
      setMessage(validationError);
      setIsError(true);
      return;
    }

    setMessage("");

    try {
      setSubmitting(true);

      await updateImageById(image.id, {
        note,
      });

      await onImageUpdated();

      setMessage("Image updated successfully.");
      setIsError(false);
    } catch (error) {
      console.log("Update image error", error);
      setMessage("Error updating image details.");
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className={styles.panel} aria-label="Image details">
      <div className={styles.header}>
        <h2>Image Details</h2>
        <Button
          // TODO: add an svg icon
          icon="×"
          onClick={onClose}
          variant="icon"
          ariaLabel="Close image details"
        />
      </div>

      <div className={styles.preview}>
        <img src={image.url} alt={image.note || "Moodboard image"} />
      </div>

      <div className={styles.section}>
        <h3>Notes</h3>
        {isOwner ? (
          <textarea
            aria-label="Notes"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setMessage("");
            }}
          />
        ) : (
          <p>{image.note || "No notes yet."}</p>
        )}
      </div>
      {/* TODO: Add tags editing and display functionality later. */}

      <div className={styles.section}>
        <h3>Folder</h3>
        <p>{currentFolder?.title || "Unknown folder"}</p>
      </div>
      {isOwner && (
        <>
          {message && <Message text={message} isError={isError} />}
          <div className={styles.actions}>
            <Button
              title="Save Changes"
              onClick={handleSaveImage}
              isLoading={isSubmitting}
              variant="primary"
            />
          </div>
        </>
      )}
    </aside>
  );
};

export default ImageDetailsPanel;
