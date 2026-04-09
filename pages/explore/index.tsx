import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { getPublicBoards } from "@/api/board";
import { Board } from "@/types/board";
import BoardsWrapper from "@/components/BoardsWrapper/BoardsWrapper";
import Message from "@/components/Message/Message";
import styles from "./styles.module.css";

const ExplorePage = () => {
  const [publicBoards, setPublicBoards] = useState<Board[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPublicBoards = async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await getPublicBoards();
      setPublicBoards(data.boards);
    } catch (error) {
      console.log("Failed to load public boards", error);
      setMessage("Failed to load public boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicBoards();
  }, []);
  return (
    <PageTemplate>
      <section className={styles.pageSection}>
        <h1 className={styles.title}>Explore page</h1>
        {message ? (
          <Message text={message} isError={true} />
        ) : (
          <BoardsWrapper
            boards={publicBoards}
            isLoading={isLoading}
            emptyTitle="No public boards yet..."
            emptyText="Check back later to explore shared boards."
            cardVariant="explore"
          />
        )}
      </section>
    </PageTemplate>
  );
};

export default ExplorePage;
