import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import burgerButton from "@/assets/burger-button.svg";
import moodboardLogo from "@/assets/moodboard-logo.svg";
import NavBar from "../NavBar/NavBar";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setUserMenuOpen(false);
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoTitleWrapper}>
            <img
              src={moodboardLogo.src}
              alt="Moodboard logo"
              className={styles.logo}
            />
            <span className={styles.websiteTitle}>Moodboard</span>
          </Link>

          <button
            type="button"
            className={styles.burgerButton}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <img src={burgerButton.src} alt="" />
          </button>

          <NavBar
            isMenuOpen={isMenuOpen}
            isUserMenuOpen={isUserMenuOpen}
            closeMenu={closeMenu}
            toggleUserMenu={toggleUserMenu}
            closeUserMenu={closeUserMenu}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
