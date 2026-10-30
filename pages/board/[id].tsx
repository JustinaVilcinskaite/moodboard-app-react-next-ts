import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { getBoardById } from "@/api/board";
import { getFoldersByBoardId } from "@/api/folder";
import type { BoardDetailResponse } from "@/types/board";
import type { Folder } from "@/types/folder";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Message from "@/components/Message/Message";
import BoardHeader from "@/components/BoardHeader/BoardHeader";
import FoldersWrapper from "@/components/FoldersWrapper/FoldersWrapper";
import FolderModal from "@/components/FolderModal/FolderModal";

const BoardPage = () => {
  const router = useRouter();

  const boardId = router.query.id;
  const { user, isLoading: isAuthLoading } = useAuth();

  const [boardData, setBoardData] = useState<BoardDetailResponse | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);

  const fetchBoard = async (id: string) => {
    const data = await getBoardById(id);
    setBoardData(data);
  };

  const fetchFolders = async (id: string) => {
    const data = await getFoldersByBoardId(id);
    setFolders(data.folders);
  };

  useEffect(() => {
    if (isAuthLoading || typeof boardId !== "string") {
      return;
    }

    const fetchPageData = async () => {
      setLoading(true);
      setMessage("");

      try {
        await fetchBoard(boardId);
        await fetchFolders(boardId);
      } catch (error) {
        console.log("Failed to load board or folders", error);
        setBoardData(null);
        setFolders([]);
        setMessage("Failed to load board data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [boardId, isAuthLoading, user?.id]);

  const handleBoardDeleted = async () => {
    await router.push("/boards");
  };

  return (
    <PageTemplate>
      {isLoading ? (
        <p>Loading...</p>
      ) : message ? (
        <Message text={message} isError={true} />
      ) : boardData ? (
        <>
          <BoardHeader
            board={boardData.board}
            isOwner={boardData.access === "owner"}
            onBoardUpdated={() => fetchBoard(boardData.board.id)}
            onBoardDeleted={handleBoardDeleted}
            onAddFolder={() => setCreateFolderModalOpen(true)}
          />
          <FoldersWrapper folders={folders} />

          {isCreateFolderModalOpen && boardData.access === "owner" && (
            <FolderModal
              boardId={boardData.board.id}
              onClose={() => setCreateFolderModalOpen(false)}
              onFolderSaved={() => fetchFolders(boardData.board.id)}
            />
          )}
        </>
      ) : null}
    </PageTemplate>
  );
};

export default BoardPage;
