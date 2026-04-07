import styles from "./styles.module.css";
import BoardCard from "../BoardCard/BoardCard";
import { Board } from "@/types/board";

type BoardsWrapperProps = {
  boards: Board[];
  isLoading: boolean;
};

const BoardsWrapper = ({ boards, isLoading }: BoardsWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : boards.length ? (
        boards.map((board) => <BoardCard key={board.id} board={board} />)
      ) : (
        <div className={styles.emptyState}>
          <h4>No boards yet...</h4>
          <p>Create your first board to get started.</p>
        </div>
      )}
    </div>
  );
};

export default BoardsWrapper;
