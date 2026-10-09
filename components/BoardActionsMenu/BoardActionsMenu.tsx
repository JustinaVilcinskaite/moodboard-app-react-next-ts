import { useState } from "react";
import styles from "./styles.module.css";
import { Board } from "@/types/board";
import Button from "../Button/Button";

type BoardActionsMenuProps = {
  board: Board;
};

const BoardActionsMenu = ({ board }: BoardActionsMenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.menuWrapper}>
      <Button
        // TODO: add an svg icon
        icon="•••"
        onClick={toggleMenu}
        variant="icon"
        ariaLabel="Board options"
      />

      {isMenuOpen && (
        <div className={styles.menu}>
          <Button title="Rename" onClick={handleRename} variant="menu" />

          <Button title="Delete" onClick={handleDelete} variant="menu" />

          <Button
            title={board.isPublic ? "Make private" : "Make public"}
            onClick={handleVisibilityChange}
            variant="menu"
          />
        </div>
      )}
    </div>
  );
};

export default BoardActionsMenu;
