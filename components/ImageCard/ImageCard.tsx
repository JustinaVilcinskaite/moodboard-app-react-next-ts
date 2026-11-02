import styles from "./styles.module.css";
import type { Image } from "@/types/image";

type ImageCardProps = {
  image: Image;
};

const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <div className={styles.card}>
      <img
        src={image.url}
        alt={image.note || "Moodboard image"}
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
};

export default ImageCard;