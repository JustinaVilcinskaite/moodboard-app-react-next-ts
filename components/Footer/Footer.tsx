import styles from "./styles.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>&copy; Moodboard {currentYear}</p>
    </footer>
  );
};

export default Footer;
