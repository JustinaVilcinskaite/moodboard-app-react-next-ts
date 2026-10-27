import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import Button from "../Button/Button";
import RenameBoardModal from "../RenameBoardModal/RenameBoardModal";
import DeleteBoardModal from "../DeleteBoardModal/DeleteBoardModal";

type BoardActionsMenuProps = {
  board: Board;
  onBoardUpdated: () => Promise<void>;
};

const BoardActionsMenu = ({ board, onBoardUpdated }: BoardActionsMenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const openRenameModal = () => {
    setRenameModalOpen(true);
    setMenuOpen(false);
  };

  const closeRenameModal = () => {
    setRenameModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    setMenuOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleVisibilityChange = () => {
    // TODO: add board visibility logic
  };

  return (
    <>
      <div className={styles.menuWrapper}>
        <Button
          // TODO: add an svg icon
          icon="•••"
          onClick={toggleMenu}
          variant="icon"
          ariaLabel="Board options"
        />

        {isMenuOpen && (
          <div className={styles.menu}>
            <Button title="Rename" onClick={openRenameModal} variant="menu" />

            <Button title="Delete" onClick={openDeleteModal} variant="menu" />

            <Button
              title={board.isPublic ? "Make private" : "Make public"}
              onClick={handleVisibilityChange}
              variant="menu"
            />
          </div>
        )}
      </div>

      {isRenameModalOpen && (
        <RenameBoardModal
          board={board}
          onClose={closeRenameModal}
          onBoardUpdated={onBoardUpdated}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteBoardModal
          board={board}
          onClose={closeDeleteModal}
          onBoardUpdated={onBoardUpdated}
        />
      )}
    </>
  );
};

export default BoardActionsMenu;
