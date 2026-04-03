export type Board = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  isPublic: boolean;
  defaultFolderId: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicBoard = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};