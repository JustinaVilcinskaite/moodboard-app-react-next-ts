import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import BoardActionsMenu from "../BoardActionsMenu/BoardActionsMenu";
import Button from "../Button/Button";

type BoardHeaderProps = {
  board: Board;
  isOwner: boolean;
  onBoardUpdated: () => Promise<void>;
  onBoardDeleted: () => Promise<void>;
  // is it an ok name? onAddFolder. for creating borad i had  onCreateClick: () => void; but of course i will need a function for the adding images as well. just wnat to be cosnistent
  onAddFolder: () => void;
};

const BoardHeader = ({
  board,
  isOwner,
  onBoardUpdated,
  onBoardDeleted,
  onAddFolder,
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

      {isOwner && (
        <div className={styles.actionsRow}>
          <Button
            title="+ Add Folder"
            onClick={onAddFolder}
            variant="primary"
          />
        </div>
      )}
    </div>
  );
};

export default BoardHeader;
