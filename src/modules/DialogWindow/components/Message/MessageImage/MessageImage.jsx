import { Box } from "@mui/joy";
import React from "react";
import Image from "./Image";
import { resizeImages } from "../../../helpers/helpersMessage";
const MessageImage = ({ images }) => {
  return (
    <Box
      sx={{
        maxWidth: 480,
        maxHeight: 432,
        minHeight: 80,
        minWidth: 192,
        overflow: "hidden",
        position: "relative",
        margin: "auto",
      }}
    >
      {resizeImages(images)?.map((image, index, arr) => (
        <Image
          key={image?.id}
          index={index}
          idImage={image?.id}
          length={images.length}
          allImages={arr}
          size={{ width: image.width, height: image.height }}
        />
      ))}
    </Box>
  );
};

export default MessageImage;
