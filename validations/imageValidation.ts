type ValidateImageProps = {
  url: string;
  folderId: string;
};

export const validateImage = ({ url, folderId }: ValidateImageProps) => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return "Image URL is required.";
  }

  try {
    const parsedUrl = new URL(trimmedUrl);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return "Please enter a valid image URL.";
    }
  } catch {
    return "Please enter a valid image URL.";
  }

  if (!folderId) {
    return "Please select a folder.";
  }

  return null;
};
