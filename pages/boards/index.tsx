import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { getMyBoards } from "@/api/board";
import { Board } from "@/types/board";
import BoardsWrapper from "@/components/BoardsWrapper/BoardsWrapper";
import Message from "@/components/Message/Message";
import styles from "./styles.module.css";

const BoardsPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBoards = async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await getMyBoards();
      setBoards(data.boards);
    } catch (error) {
      console.log("Failed to load boards", error);
      setMessage("Failed to load boards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <ProtectedRoute>
      <PageTemplate>
        <section className={styles.pageSection}>
          <h1 className={styles.title}>My Boards</h1>
          {message ? (
            <Message text={message} isError={true} />
          ) : (
            <BoardsWrapper boards={boards} isLoading={isLoading} />
          )}
        </section>
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default BoardsPage;
