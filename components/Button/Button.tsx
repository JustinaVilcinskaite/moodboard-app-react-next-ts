import type { ReactNode } from "react";
import styles from "./styles.module.css";
import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";

type ButtonProps = {
  title?: string;
  onClick: () => void;
  isLoading?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "modalPrimary"
    | "danger"
    | "icon"
    | "menu"
    | "logout";
  icon?: ReactNode;
  ariaLabel?: string;
};

const Button = ({
  title,
  onClick,
  isLoading = false,
  variant = "primary",
  icon,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant] ?? ""}`}
      onClick={onClick}
      disabled={isLoading}
      aria-label={ariaLabel ?? title}
    >
      <span
        className={styles.content}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        {icon}
        {title}
      </span>

      {isLoading && (
        <span className={styles.spinner}>
          <SpinnerBtn />
        </span>
      )}
    </button>
  );
};

export default Button;
