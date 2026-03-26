import styles from "./styles.module.css";

type MessageProps = {
  text: string;
  isError: boolean;
};

const Message = ({ text, isError }: MessageProps) => {
  return <h5 className={isError ? styles.error : styles.success}>{text}</h5>;
};

export default Message;
