import React from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../../../components/ui/Loader/Loader";
import Image from "../../../../DialogWindow/components/Message/MessageImage/Image";
import { useGetAttachmentsImagesQuery } from "../../api/attachmentsImagesApiSlice";
import s from "./OutputImage.module.scss";
const OutputImage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: images, isLoading, isFetching } = useGetAttachmentsImagesQuery(searchParams?.get("dialogs"));

  if (isFetching || isLoading) {
    return <Loader visible={isFetching || isLoading} />;
  }

  return (
    <div className={s.output__images}>
      {images?.map((image, index) => (
        <Image attachments={true} key={image?.id} idImage={image?.id} />
      ))}
    </div>
  );
};

export default OutputImage;
