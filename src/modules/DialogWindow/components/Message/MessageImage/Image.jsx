import { Box, Skeleton } from "@mui/joy"
import React, { useMemo } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useGetImageInMessageQuery } from "../../../../../components/features/getImageInMessageApiSlice"
import { setOpenDetailedImage, setOpenFromDialog } from "../../../../../redux/slices/navigationSlice"
import s from "./MessageImage.module.scss"

const Image = React.memo(({ idImage, attachments, style, index, length }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const borderRadiusImage = useMemo(() => {
    if (length === 1) {
      return '16px 16px 0 0'
    }
    if (length === 2) {
      return index === 0 ? '16px 0 0 0' : index === 1 ? '0 16px 0 0' : ''
    }
    if (length > 2) {
      return index === 0 ? '16px 0 0 0'
        : index === 1 ? '0 16px 0 0'
          : index > 2 ? '0' : ""
    }

  },[index, length])

  const { data, isLoading } = useGetImageInMessageQuery(idImage, {
    skip: !idImage,
  });

  const detailedImage = (e) => {
    e.stopPropagation();
    dispatch(setOpenDetailedImage(true));
    if (searchParams?.has("history")) {
      dispatch(setOpenFromDialog(false));
    }
    setSearchParams({
      dialogs: searchParams.get("dialogs"),
      history: `${searchParams.get("dialogs")}_photo`,
      photo: `${idImage}`,
    });
  };

  if (attachments) {
    return (
      <div className={s.wrapper__attachments__images} style={style} onClick={(e) => detailedImage(e)}>
        <img src={data} alt={"pictures"} loading="lazy" />
      </div>
    );
  }

  return (
    <Skeleton loading={isLoading} variant="overlay">
      <Box
        sx={{
          display: "inline-block",
          flex: "1 calc(50% - 0.2rem)",
          overflow: "hidden",
          "& img": {
            overflow: "hidden",
            maxWidth: "100%",
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: borderRadiusImage,
          },
        }}
      >
        <img src={data} alt="pictures" onClick={(e) => detailedImage(e)} />
      </Box>
    </Skeleton>
  );
});

export default Image;
