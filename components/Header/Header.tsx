import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import burgerButton from "@/assets/burger-button.svg";
import moodboardLogo from "@/assets/moodboard-logo.svg";
import arrowIcon from "@/assets/arrow-icon.svg";
import Button from "../Button/Button";

// type HeaderProps = {
//   websiteTitle: string;
//   logoSrc: string;
// };

const Header = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const hiddenAuthPaths = ["/login", "/signup"];
  const shouldHideAuthLinks = hiddenAuthPaths.includes(router.pathname);

  const getUserInitials = () => {
    if (!user?.name) return "";
    return user.name.trim().slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <header className={styles.header}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logoTitleWrapper}>
            <img
              src={moodboardLogo.src}
              alt="Moodboard logo"
              className={styles.logo}
            />
            <span className={styles.websiteTitle}>Moodboard</span>
          </Link>
        </div>

        <button
          className={styles.burgerButton}
          onClick={() => {
            setUserMenuOpen(false);
            setMenuOpen((prev) => !prev);
          }}
          aria-label="Toggle navigation menu"
        >
          <img src={burgerButton.src} />
        </button>

        <div className={`${styles.rightSection} ${isMenuOpen && styles.open}`}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/explore">Explore</Link>
              </li>

              {!isLoading && isAuthenticated && (
                <li>
                  <Link href="/boards">My Boards</Link>
                </li>
              )}

              {!isLoading && !isAuthenticated && !shouldHideAuthLinks && (
                <>
                  <li>
                    <Link href="/login">Log in</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {!isLoading && isAuthenticated && (
            <div className={styles.userMenuWrapper}>
              <button
                className={styles.userButton}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                aria-label="Open user menu"
              >
                {getUserInitials()}
                <img src={arrowIcon.src} />
              </button>

              {isUserMenuOpen && (
                <div className={styles.dropdown}>
                  <Button
                    title="Log out"
                    onClick={handleLogout}
                    variant="logout"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
