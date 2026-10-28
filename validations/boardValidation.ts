type BoardValidationParams = {
  title: string;
  description: string;
};

export const validateBoard = ({
  title,
  description,
}: BoardValidationParams) => {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    return "Title is required.";
  }

  if (trimmedTitle.length > 100) {
    return "Title must be at most 100 characters long.";
  }

  if (trimmedDescription.length > 500) {
    return "Description must be at most 500 characters long.";
  }

  return null;
};

