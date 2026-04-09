import styles from "./styles.module.css";
import { Board, BoardCardVariant } from "@/types/board";
import Link from "next/link";
import { formatRelativeDate } from "@/utils/formatRelativeDate";

type BoardCardProps = {
  board: Board;
  variant: BoardCardVariant;
};

const BoardCard = ({ board, variant }: BoardCardProps) => {
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
    </article>
  );
};

export default BoardCard;


  // {board.imageCount ?? 0} {(board.imageCount ?? 0) === 1 ? "image" : "images"}

// {isMyBoards && (
//   <div className={styles.info}>
//     <p>
//       {board.imageCount ?? 0} {(board.imageCount ?? 0) === 1 ? "image" : "images"}
//     </p>
//     <p>Updated {formatRelativeDate(board.updatedAt)}</p>
//     <p>{board.isPublic ? "Public" : "Private"}</p>
//   </div>
// )}