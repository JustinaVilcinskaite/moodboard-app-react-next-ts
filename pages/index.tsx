import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "@/styles/Home.module.css";
// TODO: add image
// import previewImage from "@/assets/preview.png";

const MainPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <PageTemplate>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>A space for visual research.</h1>

          <p>
            Collect visual references, organize them into boards and folders,
            and bring your creative ideas together in one place.
          </p>

          <div className={styles.actions}>
            {!isLoading && (
              <Link href={isAuthenticated ? "/boards" : "/signup"}>
                {isAuthenticated ? "My Boards" : "Get Started"}
              </Link>
            )}

            <Link href="/explore">Explore Boards</Link>
          </div>
        </div>

        <div className={styles.preview}>
          {/* <img
            src={previewImage.src}
            alt="Preview of the Moodboard application"
          /> */}
        </div>
      </section>
    </PageTemplate>
  );
};

export default MainPage;
