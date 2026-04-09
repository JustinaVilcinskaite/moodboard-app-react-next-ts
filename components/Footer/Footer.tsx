import styles from "./styles.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* <div className={styles.container}> */}
      <p>&copy; Moodboard {currentYear}</p>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
