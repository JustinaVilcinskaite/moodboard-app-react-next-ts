import type { ReactNode } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import menuDots from "@/assets/menu-dots.svg";

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
        icon={<img src={menuDots.src} alt="" className={styles.menuIcon} />}
        onClick={onToggleMenu}
        variant="icon"
        ariaLabel={ariaLabel}
      />

      {isMenuOpen && <div className={styles.menu}>{children}</div>}
    </div>
  );
};

export default ActionsMenu;
