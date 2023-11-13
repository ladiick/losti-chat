import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/joy";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imagesDetailed, setImagesDetailed } from "../../../redux/slices/messageSlice";
import Image from "../components/Message/MessageImage/Image";
import { keyframes } from "@mui/system";

const overlay = keyframes`
  from {
    backdrop-filter: blur(8px);
    opacity: 1;
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
`;

const IconBtn = {
  top: 0,
  bottom: 0,
  position: "fixed",
  width: "10vw",
  transition: "all .3s",
  "--IconButton-size": "96px",
  zIndex: 2,
  svg: {
    fill: "transparent",
  },
  "&:hover": {
    backgroundColor: "transparent",
    svg: {
      fill: "currentColor",
    },
  },
};
const content = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DetailedImageModal = () => {
  const dispatch = useDispatch();
  const { isOpen, images, currentIndex } = useSelector((state) => imagesDetailed(state));
  const [imageIndex, setImageIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);

  const imagesWithCurrentIndexFirst = useMemo(
    () => [
      images[currentIndex],
      ...images.slice(0, currentIndex),
      ...images.slice(currentIndex + 1),
    ],
    [currentIndex, images],
  );

  const closeFunc = () => {
    dispatch(
      setImagesDetailed({
        isOpen: false,
        images: [],
        currentIndex: null,
      }),
    );
  };

  const showNextImage = () => {
    setImageIndex((index) => index + 1);
  };

  const showPrevImage = () => {
    setImageIndex((index) => index - 1);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === 0) {
      return;
    }
    const currentPosition = e.touches[0].clientX;

    const direction = touchPosition - currentPosition;

    if (direction > 10 && imageIndex !== images.length - 1) {
      showNextImage();
    }

    if (direction < -10 && imageIndex !== 0) {
      showPrevImage();
    }

    setTouchPosition(0);
  };

  const transformImages = useCallback(
    (index) => {
      return imageIndex === index
        ? `translate3d(0, 0, 0) scale(1)`
        : `translate3d(${
            index > imageIndex ? window.innerWidth + "px" : -window.innerWidth + "px"
          }, 0, 0) scale(1)`;
    },
    [imageIndex],
  );

  return (
    <Modal
      open={isOpen}
      onClose={closeFunc}
      sx={{
        animation: `${overlay} 300ms`,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto 1fr",
          gridColumnGap: 0,
          gridRowGap: 0,
          justifyItems: "stretch",
          alignItems: "center",
        }}
      >
        <Box
          onClick={closeFunc}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            maxHeight: "100vh",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: "1",
            display: "flex",
            outline: "none",
            overflow: "hidden",
            touchAction: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              animation: `${content} 300ms`,
            }}
          >
            {imagesWithCurrentIndexFirst.map((url, index) => (
              <Box
                key={url?.id}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                sx={{
                  transition: "all 0.3s",
                  transform: transformImages(index),
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "100%",
                  flex: "100% 0 0",
                  zIndex: imageIndex === index ? 1 : 0,
                  touchAction: "none",
                  transformOrigin: " 0 0",
                }}
              >
                <Image detailed idImage={url?.id} />
              </Box>
            ))}
          </Box>
        </Box>

        {imageIndex !== 0 && (
          <IconButton
            onClick={showPrevImage}
            variant="plain"
            sx={{
              left: 0,
              ...IconBtn,
            }}
            aria-label="View Previous Image"
          >
            <ChevronLeftRounded aria-hidden />
          </IconButton>
        )}

        {imageIndex !== images.length - 1 && (
          <IconButton
            onClick={showNextImage}
            variant="plain"
            sx={{
              right: 0,
              ...IconBtn,
            }}
            aria-label="View Next Image"
          >
            <ChevronRightRounded aria-hidden />
          </IconButton>
        )}
      </Box>
    </Modal>
  );
};

export default DetailedImageModal;
