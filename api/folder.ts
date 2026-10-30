import { api } from "./axios";
import { getAuthHeaders } from "@/utils/auth";

export const getFoldersByBoardId = async (boardId: string) => {
  const headers = getAuthHeaders();

  const response = await api.get(`/boards/${boardId}/folders`, { headers });

  return response.data;
};

type CreateFolderProps = {
  title: string;
};

export const createFolderByBoardId = async (
  boardId: string,
  { title }: CreateFolderProps,
) => {
  const headers = getAuthHeaders();

  const body = {
    title,
  };

  const response = await api.post(`/boards/${boardId}/folders`, body, {
    headers,
  });

  return response.data;
};
