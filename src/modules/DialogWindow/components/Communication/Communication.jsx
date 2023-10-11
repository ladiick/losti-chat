import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, useColorScheme, useTheme } from "@mui/joy";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { clearMessage } from "../../../../redux/slices/messageSlice";
import { useGetMessageQuery } from "./api/messageApiSlice";
import ListMessages from "./components/ListMessages";

const Communication = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.message);
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [scrollButton, setScrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const param = searchParams.get("dialogs");
  const { mode } = useColorScheme();
  const refBlockMessage = useRef();
  const refBlockScroll = useRef();

  const { isFetching: isFetchingMessages } = useGetMessageQuery(
    { id: param, page: currentPage },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    return () => {
      dispatch(clearMessage({ param }));
    };
  }, [dispatch, param]);

  const dialogDown = () => {
    refBlockMessage.current.scrollTop = refBlockMessage.current.scrollHeight;
  };

  const scrollHandler = useCallback(
    (e) => {
      if (e.target.scrollTop < 200 && message.next) {
        setCurrentPage((pre) => pre + 1);
        refBlockMessage.current.removeEventListener("scroll", scrollHandler);
      }
      if (e.target.scrollTop + e.target.clientHeight < e.target.scrollHeight) {
        setScrollButton(true);
      } else {
        setScrollButton(false);
      }
    },
    [message.next],
  );
    console.log("refBlockScroll", refBlockScroll?.current?.scrollHeight);
    console.log("refBlockMessage", refBlockMessage?.current?.scrollHeight);
  useEffect(() => {
    const scrollToBottom = () => {
      console.log(refBlockMessage.current.scrollTop, refBlockScroll.current.scrollHeight);
      refBlockScroll.current.scrollTop = refBlockScroll.current.scrollHeight;
    };

    // Запланируйте прокрутку вниз на следующем кадре анимации
    if (refBlockScroll.current) window.requestAnimationFrame(scrollToBottom);

    // Отмените планирование после первой отрисовки
    return () => {
      window.cancelAnimationFrame(scrollToBottom);
    };
  }, [refBlockScroll.current]);

  useEffect(() => {
    refBlockMessage?.current?.addEventListener("scroll", scrollHandler);
    return () => {
      refBlockMessage?.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [message, refBlockMessage, dispatch, scrollHandler]);

  if (isFetchingMessages && currentPage === 1) {
    return (
      <Box flexGrow={1} position="relative" bgcolor={theme.vars.palette.background.body}>
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress size="sm" />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "100%",
          mb: "0.5rem",
          px: "1rem",
          position: "relative",
          background: mode === "light" ? "linear-gradient(150deg, rgba(51,144,236,1) 45%, rgba(145,198,246,1) 76%);" : theme.vars.palette.background.body,
          ...CustomScroll,
        }}
        ref={refBlockMessage}
      >
        {isFetchingMessages && currentPage > 1 && (
          <Box position="absolute" top="5%" left="50%" zIndex={10}>
            <CircularProgress size="sm" />
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            m: "0 auto",
            maxWidth: "50rem",
            minHeight: "100%",
            "@media (min-width: 1276px)": {
              width: "calc(100% - 25vh)",
            },
          }}
          flexGrow={1}
          ref={refBlockScroll}
        >
          {<ListMessages />}
        </Box>
      </Box>
      {scrollButton && (
        <Box sx={{ position: "absolute", bottom: "5.5rem", right: "1rem" }}>
          <IconButton
            variant="solid"
            color="primary"
            onClick={dialogDown}
            sx={{
              height: "3.5rem",
              width: "3.5rem",
              borderRadius: "50%",
              backgroundColor: theme.vars.palette.background.surface,
            }}
          >
            <ArrowDownward />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default Communication;
