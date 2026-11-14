import styles from "./styles.module.css";
import Link from "next/link";

type AuthRedirectLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

const AuthRedirectLink = ({ text, linkText, href }: AuthRedirectLinkProps) => {
  return (
    <p className={styles.main}>
      {text}{" "}
      <Link href={href} className={styles.linkText}>
        {linkText}
      </Link>
    </p>
  );
};

export default AuthRedirectLink;
