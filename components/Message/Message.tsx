import styles from "./styles.module.css";

type MessageProps = {
  text: string;
  isError: boolean;
};

const Message = ({ text, isError }: MessageProps) => {
  return <p className={isError ? styles.error : styles.success}>{text}</p>;
};

export default Message;

