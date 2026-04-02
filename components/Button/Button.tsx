import styles from "./styles.module.css";
import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";

type ButtonProps = {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
  variant?: "logout";
};

const Button = ({
  title,
  onClick,
  isLoading = false,
  variant,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.main} ${variant === "logout" && styles.logout}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <SpinnerBtn /> : title}
    </button>
  );
};

export default Button;
