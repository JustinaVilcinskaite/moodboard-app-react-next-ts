import styles from "./styles.module.css";
import { Board } from "@/types/board";
import Link from "next/link";
import { formatDate } from "@/utils/dateFormatter";

type BoardCardProps = {
  board: Board;
};

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Link href={`/boards/${board.id}`} className={styles.card}>
      <div className={styles.thumbnail}>Thumbnail</div>
      <div className={styles.content}>
        <h2 className={styles.title}>{board.title}</h2>
        <p className={styles.visibility}>
          {board.isPublic ? "Public" : "Private"}
        </p>
        <p className={styles.updatedAt}>Updated {formatDate(board.updatedAt)}</p>
      </div>
    </Link>
  );
};

export default BoardCard;