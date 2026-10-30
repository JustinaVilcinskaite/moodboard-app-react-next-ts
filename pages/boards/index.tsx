import { useEffect, useState } from "react";
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
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  // is this a correct name? is it only responsible for create modal open? of the one for editing as well
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

  // TODO: Fetch boards only after authentication is confirmed
  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <ProtectedRoute>
      <PageTemplate>
        <section className={styles.pageSection}>
          <BoardsPageHeader onCreateClick={openCreateModal} />

          {message ? (
            <Message text={message} isError={true} />
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
        </section>
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default BoardsPage;
