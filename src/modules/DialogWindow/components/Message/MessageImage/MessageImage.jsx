import React, { useEffect, useRef, useState } from "react";
import useMatchMedia from "../../../../../components/hooks/useMatchMedia";
import { outputOfImagesInMessage } from "../../../../../utils/outputAttachmentsPhotos";
import Image from "./Image";
import s from "./MessageImage.module.scss";
const MessageImage = React.memo(({ images }) => {
  const containerWidth = useRef();
  const [generalImages, setGeneralImages] = useState([]);
  const { isMobile } = useMatchMedia();
  useEffect(() => {
    if (images) {
      setGeneralImages(outputOfImagesInMessage(images, isMobile ? document.body.clientWidth : 587*0.7));
    }
  }, [images, isMobile]);

  useEffect(() => {
    containerWidth?.current?.scrollIntoView(true);
  }, [containerWidth?.current?.clientWidth]);

  return (
    <div className={s.wrapper__images} ref={containerWidth}>
      {generalImages?.map((image) => (
        <Image key={image?.id} style={{ width: image.width, height: image.height }} idImage={image?.id} />
      ))}
    </div>
  );
});

export default MessageImage;
