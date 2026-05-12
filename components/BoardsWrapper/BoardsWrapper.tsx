import styles from "./styles.module.css";
import BoardCard from "../BoardCard/BoardCard";
import { Board, BoardCardVariant } from "@/types/board";

type BoardsWrapperProps = {
  boards: Board[];
  isLoading: boolean;
  emptyStateTitle: string;
  emptyStateText: string;
  variant: BoardCardVariant;
};

const BoardsWrapper = ({
  boards,
  isLoading,
  emptyStateTitle,
  emptyStateText,
  variant,
}: BoardsWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : boards.length ? (
        boards.map((board) => (
          <BoardCard key={board.id} board={board} variant={variant} />
        ))
      ) : (
        <div className={styles.emptyState}>
          <h2>{emptyStateTitle}</h2>
          <p>{emptyStateText}</p>
        </div>
      )}
    </div>
  );
};

export default BoardsWrapper;
