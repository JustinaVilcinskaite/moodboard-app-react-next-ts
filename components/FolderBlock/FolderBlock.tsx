import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";

type FolderBlockProps = {
  folder: Folder;
};

const FolderBlock = ({ folder }: FolderBlockProps) => {
  return (
    <div className={styles.folder}>
      <div className={styles.header}>
        <h2 className={styles.title}>{folder.title}</h2>
      </div>
    </div>
  );
};

export default FolderBlock;
