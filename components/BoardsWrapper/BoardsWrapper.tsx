import styles from "./styles.module.css";
import BoardCard from "../BoardCard/BoardCard";
import { Board, BoardCardVariant } from "@/types/board";

type BoardsWrapperProps = {
  boards: Board[];
  isLoading: boolean;
  emptyTitle: string;
  emptyText: string;
  cardVariant: BoardCardVariant;
};

const BoardsWrapper = ({
  boards,
  isLoading,
  emptyTitle,
  emptyText,
  cardVariant,
}: BoardsWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : boards.length ? (
        boards.map((board) => (
          <BoardCard key={board.id} board={board} variant={cardVariant} />
        ))
      ) : (
        <div className={styles.emptyState}>
          <h2>{emptyTitle}</h2>
          <p>{emptyText}</p>
        </div>
      )}
    </div>
  );
};

export default BoardsWrapper;
