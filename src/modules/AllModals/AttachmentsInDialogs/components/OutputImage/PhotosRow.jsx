import React from "react";
import Image from "../../../../DialogWindow/components/Message/MessageImage/Image";
const styleRow = {
  display: "flex",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const PhotosRow = React.memo(({ images }) => {
  return (
    <div style={styleRow} aria-label="photos--row">
      {images?.map((image) => (
        <Image attachments={true} style={{ width: image?.width, height: image?.height }} key={image?.id} idImage={image?.id} />
      ))}
    </div>
  );
});

export default PhotosRow;
