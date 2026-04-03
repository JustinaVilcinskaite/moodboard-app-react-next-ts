import { api } from "./axios";
import { getAuthHeaders } from "@/utils/auth";

type CreateBoardProps = {
  title: string;
  description?: string;
  isPublic?: boolean;
};

type UpdateBoardProps = {
  title?: string;
  description?: string;
  isPublic?: boolean;
};

export const getMyBoards = async () => {
  const headers = getAuthHeaders();
  const response = await api.get("/boards", { headers });

  return response.data;
};

export const getPublicBoards = async () => {
  const response = await api.get("/public/boards");

  return response.data;
};

export const createBoard = async ({
  title,
  description = "",
  isPublic = false,
}: CreateBoardProps) => {
  const headers = getAuthHeaders();

  const body = {
    title,
    description,
    isPublic,
  };

  const response = await api.post("/boards", body, { headers });

  return response.data;
};

export const updateBoardById = async (
  boardId: string,
  updates: UpdateBoardProps,
) => {
  const headers = getAuthHeaders();
  const response = await api.patch(`/boards/${boardId}`, updates, { headers });

  return response.data;
};

export const deleteBoardById = async (boardId: string) => {
  const headers = getAuthHeaders();
  const response = await api.delete(`/boards/${boardId}`, { headers });

  return response.data;
};

////

// export const getBoardById = async (boardId: string) => {
//   const headers = getAuthHeaders();

//   const response = await api.get(`/boards/${boardId}`, { headers });

//   return response.data;
// };
