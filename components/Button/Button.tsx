import styles from "./styles.module.css";
import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";

type ButtonProps = {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
};

const Button = ({ title, onClick, isLoading = false }: ButtonProps) => {
  return (
    <button
      className={styles.main}
      type="button"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <SpinnerBtn /> : title}
    </button>
  );
};

export default Button;
