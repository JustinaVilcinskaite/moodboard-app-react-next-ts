import styles from "./styles.module.css";
import { Board } from "@/types/board";
import Link from "next/link";
import { formatRelativeDate } from "@/utils/formatRelativeDate";

type BoardCardProps = {
  board: Board;
};

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Link href={`/boards/${board.id}`} className={styles.card}>
      <div className={styles.thumbnail}>
        {board.thumbnailUrl && (
          <img
            src={board.thumbnailUrl}
            alt={`${board.title} thumbnail`}
            className={styles.thumbnailImage}
          />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{board.title}</h2>
        <div className={styles.contentDetails}>
          <p className={styles.imageCount}>
            {board.imageCount} {board.imageCount === 1 ? "image" : "images"}
          </p>

          <p className={styles.updatedAt}>
            Updated {formatRelativeDate(board.updatedAt)}
          </p>
          <p className={styles.visibility}>
            {board.isPublic ? "Public" : "Private"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
