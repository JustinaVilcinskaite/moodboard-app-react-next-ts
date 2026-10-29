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

const BoardPage = () => {
  const router = useRouter();

  const boardId = router.query.id;
  const { user, isLoading: isAuthLoading } = useAuth();

  const [boardData, setBoardData] = useState<BoardDetailResponse | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  //   fetching board
  //   const fetchBoard = async (id: string, showLoading = true) => {
  //     if (showLoading) {
  //       setLoading(true);
  //     }
  //     setMessage("");

  //     try {
  //       const data = await getBoardById(id);
  //       setBoardData(data);
  //     } catch (error) {
  //       console.log("Failed to load board", error);
  //       setBoardData(null);
  //       setMessage("Failed to load board.");
  //     } finally {
  //       if (showLoading) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetching board and folder
  const fetchBoard = async (id: string, showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    setMessage("");

    try {
      const data = await getBoardById(id);
      const foldersData = await getFoldersByBoardId(id);

      setBoardData(data);
      setFolders(foldersData.folders);
    } catch (error) {
      console.log("Failed to load board", error);
      setBoardData(null);
      setFolders([]);
      setMessage("Failed to load board.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAuthLoading || typeof boardId !== "string") {
      return;
    }

    fetchBoard(boardId);
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
            onBoardUpdated={() => fetchBoard(boardData.board.id, false)}
            onBoardDeleted={handleBoardDeleted}
          />
          <FoldersWrapper folders={folders} />
        </>
      ) : null}
    </PageTemplate>
  );
};

export default BoardPage;
