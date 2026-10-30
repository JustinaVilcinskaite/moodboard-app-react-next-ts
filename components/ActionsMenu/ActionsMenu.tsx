import type { ReactNode } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";

type ActionsMenuProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  ariaLabel: string;
  children: ReactNode;
};

const ActionsMenu = ({
  isMenuOpen,
  onToggleMenu,
  ariaLabel,
  children,
}: ActionsMenuProps) => {
  return (
    <div className={styles.menuWrapper}>
      <Button
        // TODO: add an svg icon
        icon="•••"
        onClick={onToggleMenu}
        variant="icon"
        ariaLabel={ariaLabel}
      />

      {isMenuOpen && <div className={styles.menu}>{children}</div>}
    </div>
  );
};

export default ActionsMenu;