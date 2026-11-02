import { api } from "./axios";
import { getAuthHeaders } from "@/utils/auth";

export const getImagesByBoardId = async (boardId: string) => {
  const headers = getAuthHeaders();

  const response = await api.get(`/boards/${boardId}/images`, { headers });

  return response.data;
};

type CreateImageProps = {
  url: string;
  folderId: string;
};

export const createImageByUrl = async (
  boardId: string,
  { url, folderId }: CreateImageProps,
) => {
  const headers = getAuthHeaders();

  const body = {
    url,
    folderId,
  };

  const response = await api.post(`/boards/${boardId}/images`, body, {
    headers,
  });

  return response.data;
};