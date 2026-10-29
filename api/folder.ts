import { api } from "./axios";
import { getAuthHeaders } from "@/utils/auth";
import type { Folder } from "@/types/folder";

export const getFoldersByBoardId = async (boardId: string) => {
  const headers = getAuthHeaders();

  const response = await api.get<{ folders: Folder[] }>(
    `/boards/${boardId}/folders`,
    { headers },
  );

  return response.data;
};



