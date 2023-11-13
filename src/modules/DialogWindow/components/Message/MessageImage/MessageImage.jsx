import { Box } from "@mui/joy";
import React from "react";
import Image from "./Image";
import { resizeImages } from "../../../helpers/helpersMessage";
const MessageImage = ({ images }) => {
  return (
    <Box
      sx={{
        // flexShrink: "1",
        // display: "flex",
        // flexWrap: "wrap",
        // gap: "0.2rem",
        // padding: "0.2rem",
        maxWidth: 480,
        maxHeight: 432,
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
