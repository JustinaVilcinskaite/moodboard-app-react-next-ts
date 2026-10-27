import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { getMyBoards } from "@/api/board";
import { Board } from "@/types/board";
import BoardsWrapper from "@/components/BoardsWrapper/BoardsWrapper";
import Message from "@/components/Message/Message";
import BoardsPageHeader from "@/components/BoardsPageHeader/BoardsPageHeader";
import CreateBoardModal from "@/components/CreateBoardModal/CreateBoardModal";
import styles from "./styles.module.css";

const BoardsPage = () => {
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

  const updateBoardVisibility = (boardId: string, isPublic: boolean) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, isPublic } : board,
      ),
    );
  };



  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

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
              onBoardVisibilityChange={updateBoardVisibility}
            />
          )}
          {isCreateModalOpen && (
            <CreateBoardModal
              onClose={closeCreateModal}
              onBoardCreated={() => fetchBoards(false)}
            />
          )}
        </section>
      </PageTemplate>
    </ProtectedRoute>
  );
};

export default BoardsPage;
