import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { getBoardById } from "@/api/board";
import { getFoldersByBoardId } from "@/api/folder";
import { getImagesByBoardId } from "@/api/image";
import type { BoardDetailResponse } from "@/types/board";
import type { Folder } from "@/types/folder";
import type { Image } from "@/types/image";

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
  const [images, setImages] = useState<Image[]>([]);

  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchBoard = async (id: string) => {
    const data = await getBoardById(id);
    setBoardData(data);
  };

  const fetchFolders = async (id: string) => {
    const data = await getFoldersByBoardId(id);
    setFolders(data.folders);
  };

  const fetchImages = async (id: string) => {
    const data = await getImagesByBoardId(id);
    setImages(data.images);
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
        await fetchImages(boardId);
      } catch (error) {
        console.log("Failed to load board, folders or images", error);
        setBoardData(null);
        setFolders([]);
        setImages([]);
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

  const toggleMenu = (id: string) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const closeMenu = () => {
    setOpenMenuId(null);
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
            isMenuOpen={openMenuId === "board"}
            onToggleMenu={() => toggleMenu("board")}
            onCloseMenu={closeMenu}
          />
          <FoldersWrapper
            folders={folders}
            images={images}
            boardId={boardData.board.id}
            isOwner={boardData.access === "owner"}
            onFoldersUpdated={() => fetchFolders(boardData.board.id)}
            openMenuId={openMenuId}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
          />

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
