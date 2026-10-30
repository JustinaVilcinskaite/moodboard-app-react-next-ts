import { useState } from "react";
import { Board } from "@/types/board";
import Button from "../Button/Button";
import BoardModal from "../BoardModal/BoardModal";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";
import ActionsMenu from "../ActionsMenu/ActionsMenu";

type BoardActionsMenuProps = {
  board: Board;
  onBoardUpdated: () => Promise<void>;
  onBoardDeleted?: () => Promise<void>;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const BoardActionsMenu = ({
  board,
  onBoardUpdated,
  onBoardDeleted,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: BoardActionsMenuProps) => {
  const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
    null,
  );

  const openEditModal = () => {
    setActiveModal("edit");
    onCloseMenu();
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
    onCloseMenu();
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // TODO: close the board actions menu when clicking outside of it

  return (
    <>
      <ActionsMenu
        isMenuOpen={isMenuOpen}
        onToggleMenu={onToggleMenu}
        ariaLabel="Board options"
      >
        <Button title="Edit" onClick={openEditModal} variant="menu" />
        <Button title="Delete" onClick={openDeleteModal} variant="menu" />
      </ActionsMenu>
      
      {activeModal === "edit" && (
        <BoardModal
          board={board}
          onClose={closeModal}
          onBoardSaved={onBoardUpdated}
        />
      )}

      {activeModal === "delete" && (
        <DeleteBoardModal
          board={board}
          onClose={closeModal}
          onBoardUpdated={onBoardDeleted ?? onBoardUpdated}
        />
      )}
    </>
  );
};

export default BoardActionsMenu;
