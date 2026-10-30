import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";
import FolderActionsMenu from "../FolderActionsMenu/FolderActionsMenu";

type FolderBlockProps = {
  folder: Folder;
  boardId: string;
  isOwner: boolean;
  onFolderUpdated: () => Promise<void>;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const FolderBlock = ({
  folder,
  boardId,
  isOwner,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onFolderUpdated,
}: FolderBlockProps) => {
  return (
    <div className={styles.folder}>
      <div className={styles.header}>
        <h2 className={styles.title}>{folder.title}</h2>
        {isOwner && !folder.isDefault && (
          <FolderActionsMenu
            folder={folder}
            boardId={boardId}
            onFolderUpdated={onFolderUpdated}
            isMenuOpen={isMenuOpen}
            onToggleMenu={onToggleMenu}
            onCloseMenu={onCloseMenu}
          />
        )}
      </div>
    </div>
  );
};

export default FolderBlock;
