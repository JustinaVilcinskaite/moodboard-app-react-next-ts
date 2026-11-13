import styles from "./styles.module.css";
import type { Image } from "@/types/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
  const maxWidth =
    images.length > 0 && images.length <= 6 ? images.length * 210 : undefined;

  return (
    <div className={styles.wrapper} style={{ maxWidth }}>
      {images.length ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            0: 1,
            280: 2,
            600: 3,
            800: 4,
            1000: 5,
            1200: 6,
            1400: 7,
            1600: 8,
            1800: 9,
          }}
        >
          <Masonry gutter="0.8rem" sequential>
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                isSelected={selectedImageId === image.id}
                onSelectImage={onSelectImage}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <p className={styles.emptyState}>No images in this folder yet.</p>
      )}
    </div>
  );
};

export default ImagesWrapper;
