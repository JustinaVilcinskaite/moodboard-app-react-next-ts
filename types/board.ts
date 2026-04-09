export type Board = {
  id: string;
  ownerId?: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  defaultFolderId?: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  imageCount?: number;
};

export type BoardCardVariant = "my-boards" | "explore";
