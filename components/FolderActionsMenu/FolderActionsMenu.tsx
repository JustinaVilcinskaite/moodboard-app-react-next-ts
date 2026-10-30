import { useState } from "react";
import type { Folder } from "@/types/folder";
import ActionsMenu from "../ActionsMenu/ActionsMenu";
import Button from "../Button/Button";
import FolderModal from "../FolderModal/FolderModal";
import { deleteFolderById } from "@/api/folder";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

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
  const [activeModal, setActiveModal] = useState<"rename" | "delete" | null>(
    null,
  );

  const openRenameModal = () => {
    setActiveModal("rename");
    onCloseMenu();
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
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
        <Button title="Delete" onClick={openDeleteModal} variant="menu" />
      </ActionsMenu>

      {activeModal === "rename" && (
        <FolderModal
          boardId={boardId}
          folder={folder}
          onClose={closeModal}
          onFolderSaved={onFolderUpdated}
        />
      )}

      {activeModal === "delete" && (
        <ConfirmDeleteModal
          title="Delete Folder"
          itemName={folder.title}
          warning="Images in this folder will be moved to General folder. This action cannot be undone."
          errorMessage="Error deleting folder."
          onClose={closeModal}
          onConfirm={async () => {
            await deleteFolderById(folder.id);
            await onFolderUpdated();
          }}
        />
      )}
    </>
  );
};

export default FolderActionsMenu;
