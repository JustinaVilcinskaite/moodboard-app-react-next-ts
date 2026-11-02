import { api } from "./axios";
import { getAuthHeaders } from "@/utils/auth";

export const getImagesByBoardId = async (boardId: string) => {
  const headers = getAuthHeaders();

  const response = await api.get(`/boards/${boardId}/images`, { headers });

  return response.data;
};