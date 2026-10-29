import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import BoardActionsMenu from "../BoardActionsMenu/BoardActionsMenu";

type BoardHeaderProps = {
  board: Board;
  isOwner: boolean;
  onBoardUpdated: () => Promise<void>;
  onBoardDeleted: () => Promise<void>;
};

const BoardHeader = ({
  board,
  isOwner,
  onBoardUpdated,
  onBoardDeleted,
}: BoardHeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>{board.title}</h1>

        {isOwner && (
          <BoardActionsMenu
            board={board}
            onBoardUpdated={onBoardUpdated}
            onBoardDeleted={onBoardDeleted}
            isMenuOpen={isMenuOpen}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
          />
        )}
      </div>

      <p className={styles.visibility}>
        {board.isPublic ? "Public" : "Private"}
      </p>

      {board.description && (
        <p className={styles.description}>{board.description}</p>
      )}
    </div>
  );
};

export default BoardHeader;
