import styles from "./styles.module.css";
import type { Folder } from "@/types/folder";
import type { Image } from "@/types/image";
import FolderActionsMenu from "../FolderActionsMenu/FolderActionsMenu";
import ImagesWrapper from "../ImagesWrapper/ImagesWrapper";
import Button from "../Button/Button";

type FolderBlockProps = {
  folder: Folder;
  images: Image[];
  boardId: string;
  isOwner: boolean;
  onFolderUpdated: () => Promise<void>;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onAddImage: (folderId: string) => void;
  selectedImageId: string | null;
  onSelectImage: (imageId: string) => void;
};

const FolderBlock = ({
  folder,
  images,
  boardId,
  isOwner,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onFolderUpdated,
  onAddImage,
  selectedImageId,
  onSelectImage,
}: FolderBlockProps) => {
  return (
    <div className={styles.folder}>
      <div className={styles.header}>
        <h2 className={styles.title}>{folder.title}</h2>
        {isOwner && (
          <div className={styles.actions}>
            <Button
              icon="+"
              onClick={() => onAddImage(folder.id)}
              variant="icon"
            />

            {!folder.isDefault && (
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
        )}
      </div>

      <ImagesWrapper
        images={images}
        selectedImageId={selectedImageId}
        onSelectImage={onSelectImage}
      />
    </div>
  );
};

export default FolderBlock;
