import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { getMyBoards } from "@/api/board";
import { Board } from "@/types/board";
import BoardsWrapper from "@/components/BoardsWrapper/BoardsWrapper";
import Message from "@/components/Message/Message";
import BoardsPageHeader from "@/components/BoardsPageHeader/BoardsPageHeader";
import BoardModal from "@/components/BoardModal/BoardModal";
import styles from "./styles.module.css";

const BoardsPage = () => {
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const fetchBoards = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setMessage("");

    try {
      const data = await getMyBoards();
      setBoards(data.boards);
    } catch (error) {
      console.log("Failed to load boards", error);
      setMessage("Failed to load boards.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) {
      return;
    }
    fetchBoards();
  }, [isAuthLoading, isAuthenticated]);

  return (
    <ProtectedRoute>
      <PageTemplate>
        <BoardsPageHeader onCreateClick={openCreateModal} />

        {message ? (
          <div className={styles.pageError}>
            <Message text={message} isError={true} />
          </div>
        ) : (
          <BoardsWrapper
            boards={boards}
            isLoading={isLoading}
            emptyStateTitle="No boards yet..."
            emptyStateText="Create your first board to get started."
            variant="my-boards"
            onBoardUpdated={() => fetchBoards(false)}
          />
        )}
        {isCreateModalOpen && (
          <BoardModal
            onClose={closeCreateModal}
            onBoardSaved={() => fetchBoards(false)}
          />
        )}
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default BoardsPage;
