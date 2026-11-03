import styles from "./styles.module.css";
import type { Image } from "@/types/image";
import type { Folder } from "@/types/folder";
import Button from "../Button/Button";

type ImageDetailsPanelProps = {
  image: Image;
  folders: Folder[];
  onClose: () => void;
};

const ImageDetailsPanel = ({
  image,
  folders,
  onClose,
}: ImageDetailsPanelProps) => {
  const currentFolder = folders.find((folder) => folder.id === image.folderId);

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
        <p>{image.note || "No notes yet."}</p>
      </div>

      <div className={styles.section}>
        <h3>Tags</h3>
        {image.tags.length ? (
          <ul className={styles.tags}>
            {image.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : (
          <p>No tags yet.</p>
        )}
      </div>

      <div className={styles.section}>
        <h3>Folder</h3>
        <p>{currentFolder?.title || "Unknown folder"}</p>
      </div>
    </aside>
  );
};

export default ImageDetailsPanel;
