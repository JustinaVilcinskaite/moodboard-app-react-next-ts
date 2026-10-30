import styles from "./styles.module.css";
import { Board } from "@/types/board";
import BoardActionsMenu from "../BoardActionsMenu/BoardActionsMenu";
import Button from "../Button/Button";

type BoardHeaderProps = {
  board: Board;
  isOwner: boolean;
  onBoardUpdated: () => Promise<void>;
  onBoardDeleted: () => Promise<void>;
  onAddFolder: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

const BoardHeader = ({
  board,
  isOwner,
  onBoardUpdated,
  onBoardDeleted,
  onAddFolder,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: BoardHeaderProps) => {
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
            onToggleMenu={onToggleMenu}
            onCloseMenu={onCloseMenu}
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
