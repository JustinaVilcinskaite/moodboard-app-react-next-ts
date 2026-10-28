import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import Button from "../Button/Button";
import BoardModal from "../BoardModal/BoardModal";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";

type BoardActionsMenuProps = {
  board: Board;
  onBoardUpdated: () => Promise<void>;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const BoardActionsMenu = ({
  board,
  onBoardUpdated,
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
      <div className={styles.menuWrapper}>
        <Button
          // TODO: add an svg icon
          icon="•••"
          onClick={onToggleMenu}
          variant="icon"
          ariaLabel="Board options"
        />

        {isMenuOpen && (
          <div className={styles.menu}>
            <Button title="Edit" onClick={openEditModal} variant="menu" />

            <Button title="Delete" onClick={openDeleteModal} variant="menu" />
          </div>
        )}
      </div>

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
          onBoardUpdated={onBoardUpdated}
        />
      )}
    </>
  );
};

export default BoardActionsMenu;
