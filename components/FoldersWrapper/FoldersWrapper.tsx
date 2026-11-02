import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";
import type { Image } from "@/types/image";
import FolderBlock from "../FolderBlock/FolderBlock";

type FoldersWrapperProps = {
  folders: Folder[];
  images: Image[];
  boardId: string;
  isOwner: boolean;
  onFoldersUpdated: () => Promise<void>;
  openMenuId: string | null;
  onToggleMenu: (id: string) => void;
  onCloseMenu: () => void;
};

const FoldersWrapper = ({
  folders,
  images,
  boardId,
  isOwner,
  openMenuId,
  onToggleMenu,
  onCloseMenu,
  onFoldersUpdated,
}: FoldersWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {folders.map((folder) => (
        <FolderBlock
          key={folder.id}
          folder={folder}
          images={images.filter((image) => image.folderId === folder.id)}
          boardId={boardId}
          isOwner={isOwner}
          onFolderUpdated={onFoldersUpdated}
          isMenuOpen={openMenuId === folder.id}
          onToggleMenu={() => onToggleMenu(folder.id)}
          onCloseMenu={onCloseMenu}
        />
      ))}
    </div>
  );
};

export default FoldersWrapper;
