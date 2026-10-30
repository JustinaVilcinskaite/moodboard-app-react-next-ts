import { useState } from "react";
import type { Folder } from "@/types/folder";
import ActionsMenu from "../ActionsMenu/ActionsMenu";
import Button from "../Button/Button";
import FolderModal from "../FolderModal/FolderModal";

type FolderActionsMenuProps = {
  folder: Folder;
  boardId: string;
  onFolderUpdated: () => Promise<void>;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const FolderActionsMenu = ({
  folder,
  boardId,
  onFolderUpdated,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: FolderActionsMenuProps) => {
  const [activeModal, setActiveModal] = useState<"rename" | null>(null);

  const openRenameModal = () => {
    setActiveModal("rename");
    onCloseMenu();
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <ActionsMenu
        isMenuOpen={isMenuOpen}
        onToggleMenu={onToggleMenu}
        ariaLabel="Folder options"
      >
        <Button title="Rename" onClick={openRenameModal} variant="menu" />
      </ActionsMenu>

      {activeModal === "rename" && (
        <FolderModal
          boardId={boardId}
          folder={folder}
          onClose={closeModal}
          onFolderSaved={onFolderUpdated}
        />
      )}
    </>
  );
};

export default FolderActionsMenu;
