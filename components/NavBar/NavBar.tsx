import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import arrowIcon from "@/assets/arrow-icon.svg";
import Button from "../Button/Button";
import { getUserInitial } from "@/utils/getUserInitial";

type NavBarProps = {
  isMenuOpen: boolean;
  isUserMenuOpen: boolean;
  closeMenu: () => void;
  toggleUserMenu: () => void;
  closeUserMenu: () => void;
};

const NavBar = ({
  isMenuOpen,
  isUserMenuOpen,
  closeMenu,
  toggleUserMenu,
  closeUserMenu,
}: NavBarProps) => {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const hiddenAuthPaths = ["/login", "/signup"];
  const shouldHideAuthLinks = hiddenAuthPaths.includes(router.pathname);

  const handleLogout = () => {
    logout();
    closeUserMenu();
    closeMenu();
    router.push("/");
  };

  return (
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

      {!isLoading && isAuthenticated && user &&(
        <div className={styles.userMenuWrapper}>
          <button
            type="button"
            className={styles.userButton}
            onClick={toggleUserMenu}
            aria-label="Toggle user menu"
          >
            {getUserInitial(user.name)}
            <img src={arrowIcon.src} alt="Open user menu" />
          </button>

          {isUserMenuOpen && (
            <div className={styles.dropdown}>
              <Button title="Log out" onClick={handleLogout} variant="logout" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
