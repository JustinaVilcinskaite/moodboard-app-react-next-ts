import styles from "./styles.module.css";
import type { Image } from "@/types/image";

type ImageCardProps = {
  image: Image;
  isSelected: boolean;
  onSelectImage: (imageId: string) => void;
};

const ImageCard = ({ image, isSelected, onSelectImage }: ImageCardProps) => {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelectImage(image.id)}
      aria-label="View image details"
    >
      <img
        src={image.url}
        alt={image.note || "Moodboard image"}
        className={styles.image}
        loading="lazy"
      />
    </button>
  );
};

export default ImageCard;
