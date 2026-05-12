import styles from "./styles.module.css";
import Button from "../Button/Button";

type BoardsPageHeaderProps = {
  onCreateClick: () => void;
};
const BoardsPageHeader = ({ onCreateClick }: BoardsPageHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.title}>My Boards</h1>

        {/* Search will go here later */}
      </div>

      <div className={styles.actionsRow}>
        <Button
          title="+ Create Board"
          onClick={onCreateClick}
          variant="primary"
        />
      </div>

      {/* Filters and sort will go here later */}
    </div>
  );
};

export default BoardsPageHeader;
