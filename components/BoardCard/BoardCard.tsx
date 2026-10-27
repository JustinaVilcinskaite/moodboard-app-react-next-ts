import styles from "./styles.module.css";
import { Board, BoardCardVariant } from "@/types/board";
import Link from "next/link";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import BoardActionsMenu from "../BoardActionsMenu/BoardActionsMenu";

type BoardCardProps = {
  board: Board;
  variant: BoardCardVariant;
  onBoardUpdated?: () => Promise<void>;
  onBoardVisibilityChange?: (boardId: string, isPublic: boolean) => void;
};

const BoardCard = ({
  board,
  variant,
  onBoardUpdated,
  onBoardVisibilityChange,
}: BoardCardProps) => {
  const isMyBoards = variant === "my-boards";

  return (
    <article className={styles.card}>
      <Link href={`/boards/${board.id}`} className={styles.cardLink}>
        <div className={styles.thumbnail}>
          {board.thumbnailUrl && (
            <img src={board.thumbnailUrl} alt={`${board.title} thumbnail`} />
          )}
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>{board.title}</h2>
          {isMyBoards && (
            <div className={styles.info}>
              <p>
                {board.imageCount} {board.imageCount === 1 ? "image" : "images"}
              </p>

              <p>Updated {formatRelativeDate(board.updatedAt)}</p>
              <p>{board.isPublic ? "Public" : "Private"}</p>
            </div>
          )}
        </div>
      </Link>
      {isMyBoards && onBoardUpdated && onBoardVisibilityChange && (
        <BoardActionsMenu
          board={board}
          onBoardUpdated={onBoardUpdated}
          onBoardVisibilityChange={onBoardVisibilityChange}
        />
      )}
    </article>
  );
};

export default BoardCard;
