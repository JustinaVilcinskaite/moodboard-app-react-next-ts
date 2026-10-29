import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { getBoardById } from "@/api/board";
import type { BoardDetailResponse } from "@/types/board";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Message from "@/components/Message/Message";

const BoardPage = () => {
  const router = useRouter();

  const boardId = router.query.id;
  const { user, isLoading: isAuthLoading } = useAuth();

  const [boardData, setBoardData] = useState<BoardDetailResponse | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchBoard = async (id: string) => {
    setLoading(true);
    setMessage("");

    try {
      const data = await getBoardById(id);
      setBoardData(data);
    } catch (error) {
      console.log("Failed to load board", error);
      setBoardData(null);
      setMessage("Failed to load board.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthLoading || typeof boardId !== "string") {
      return;
    }

    fetchBoard(boardId);
  }, [boardId, isAuthLoading, user?.id]);

  return (
    <PageTemplate>
      {isLoading ? (
        <p>Loading...</p>
      ) : message ? (
        <Message text={message} isError={true} />
      ) : boardData ? (
        <section>
          <h1>{boardData.board.title}</h1>
          <p>{boardData.board.description}</p>
          {/* temporary */}
          <p>{boardData.access}</p>
        </section>
      ) : null}
    </PageTemplate>
  );
};

export default BoardPage;
