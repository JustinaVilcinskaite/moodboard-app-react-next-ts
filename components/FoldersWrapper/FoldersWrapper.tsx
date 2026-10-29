import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";
import FolderBlock from "../FolderBlock/FolderBlock";

type FoldersWrapperProps = {
  folders: Folder[];
};

const FoldersWrapper = ({ folders }: FoldersWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {folders.map((folder) => (
        <FolderBlock key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default FoldersWrapper;
