import { Box, CircularProgress, Skeleton } from "@mui/joy";
import React from "react";
import { useDispatch } from "react-redux";
import { useGetImageInMessageQuery } from "../../../../../components/features/getImageInMessageApiSlice";
import { setImagesDetailed } from "../../../../../redux/slices/messageSlice";
import { borderRadiusImage } from "../helpers/helpers";

const Image = ({ idImage, size, style, detailed, index, length, allImages }) => {
  const dispatch = useDispatch();

  const { data, isFetching } = useGetImageInMessageQuery(idImage, {
    skip: !idImage,
  });

  const detailedImage = (e) => {
    e.stopPropagation();
    dispatch(
      setImagesDetailed({
        isOpen: true,
        images: allImages,
        currentIndex: index,
      }),
    );
  };

  if (detailed) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: "none",
          overflow: "hidden",
          height: "100%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          padding: "3.25rem 0",
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            transition: "all 0.3s",
            maxWidth: 925,
            position: "relative",
            "& img": {
              overflow: "hidden",
              maxWidth: "100%",
              objectFit: "cover",
              height: "100%",
              width: "100%",
            },
            ...style,
          }}
        >
          <img src={data} alt={"pictures"} />
        </Box>
      </Box>
    );
  }

  return (
    <Skeleton
      loading={!data && isFetching}
      sx={{
        maxHeight: length === 1 ? 432 : 320,
        width: size.width,
        height: size.height,
        flex: "1 calc(50% - 0.2rem)",
        overflow: "hidden",
        position: "static",
        borderRadius: "sm",
        transition: "all 0.3s",
        "&:before": {
          position: "static",
        },
        "& *": {
          visibility: "visible",
        },
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!data && isFetching ? (
        <CircularProgress variant="plain" size="sm" />
      ) : (
        <Box
          onClick={detailedImage}
          sx={{
            display: "inline-block",
            flex: "1 calc(50% - 0.2rem)",
            overflow: "hidden",
            maxHeight: 432,
            "& img": {
              overflow: "hidden",
              maxWidth: "100%",
              objectFit: "cover",
              height: "100%",
              width: "100%",
              cursor: "pointer",
              borderRadius: borderRadiusImage({ length, index }),
            },
            ...style,
          }}
        >
          <img src={data} alt="pictures" loading="lazy" />
        </Box>
      )}
    </Skeleton>
  );
};

export default React.memo(Image);
