import React from "react";
import PhotoAlbum from "react-photo-album";
import Image from "./Image";
import { Box } from "@mui/joy";

const MessageImage = ({ images }) => {
  return (
    <PhotoAlbum
      padding={4}
      spacing={0}
      photos={images.map((image) => ({
        ...image,
        src: image.image,
        key: image.id,
      }))}
      targetRowHeight={200}
      layout="rows"
      // onClick={({ index }) => setIndex(index)}
      renderContainer={({ containerProps, children, containerRef }) => (
        <Box sx={{ maxHeight: 432, maxWidth: 480 }} ref={containerRef} {...containerProps}>
          {children}
        </Box>
      )}
      renderPhoto={({ imageProps, photo }) => (
        <Image idImage={photo?.id} imageProps={imageProps} photo={photo} />
      )}
    />
  );
};

export default MessageImage;
