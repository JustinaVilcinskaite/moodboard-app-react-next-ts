import styles from "./styles.module.css";
import type { Image } from "@/types/image";
import ImageCard from "../ImageCard/ImageCard";

type ImagesWrapperProps = {
  images: Image[];
  selectedImageId: string | null;
  onSelectImage: (imageId: string) => void;
};

const ImagesWrapper = ({
  images,
  selectedImageId,
  onSelectImage,
}: ImagesWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      {images.length ? (
        images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            isSelected={selectedImageId === image.id}
            onSelectImage={onSelectImage}
          />
        ))
      ) : (
        <p className={styles.emptyState}>No images in this folder yet.</p>
      )}
    </div>
  );
};

export default ImagesWrapper;
