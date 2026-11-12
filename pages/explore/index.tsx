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
      <h1 className={styles.title}>Explore</h1>
      {message ? (
        <div className={styles.pageError}>
          <Message text={message} isError={true} />
        </div>
      ) : (
        <BoardsWrapper
          boards={publicBoards}
          isLoading={isLoading}
          emptyStateTitle="No public boards yet..."
          emptyStateText="Check back later to explore shared boards."
          variant="explore"
        />
      )}
    </PageTemplate>
  );
};

export default ExplorePage;
