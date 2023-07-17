import React, { useEffect, useRef, useState } from "react";
import Image from "./Image";
import s from "./MessageImage.module.scss";
import { outputOfImagesInMessage } from "../../../../../utils/outputAttachmentsPhotos";

const MessageImage = React.memo(({ images }) => {
  const containerWidth = useRef();
  const [generalImages, setGeneralImages] = useState([]);

  useEffect(() => {
    if (images) {
      setGeneralImages(outputOfImagesInMessage(images, containerWidth?.current?.clientWidth));
    }
  }, [images]);

  useEffect(() => {
    containerWidth?.current?.scrollIntoView(true);
  }, []);

  // if (generalImages.length === 0) {
  // 	return (
  // 		<div className={s.wrapper__images} ref={containerWidth}>
  //
  // 		</div>
  // 	)
  // }

  return (
    <div className={s.wrapper__images} ref={containerWidth}>
      {generalImages?.map((image) => (
        <Image key={image?.id} style={{ width: image.width, height: image.height }} idImage={image?.id} />
      ))}
    </div>
  );
});

export default MessageImage;
