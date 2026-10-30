export const validateFolder = (title: string) => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return "Title is required.";
  }

  if (trimmedTitle.length > 100) {
    return "Title must be at most 100 characters long.";
  }

  return null;
};