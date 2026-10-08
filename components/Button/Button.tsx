import { ReactNode } from "react";
import styles from "./styles.module.css";
import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";

type ButtonProps = {
  title?: string;
  onClick: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "logout" | "icon";
  icon?: ReactNode;
  ariaLabel?: string;
};

const Button = ({
  title,
  onClick,
  isLoading = false,
  variant,
  icon,
  ariaLabel,
}: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.button}
        ${variant === "primary" && styles.primary}
        ${variant === "secondary" && styles.secondary}
        ${variant === "logout" && styles.logout}
        ${variant === "icon" && styles.icon}

      `}
      onClick={onClick}
      disabled={isLoading}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <SpinnerBtn />
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </button>
  );
};

export default Button;
