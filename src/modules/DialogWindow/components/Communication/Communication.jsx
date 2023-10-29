import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/joy";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "underscore";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { clearSelectMessages } from "../../../../redux/slices/messageSlice";
import { useGetMessageQuery } from "./api/messageApiSlice";
import ListMessages from "./components/ListMessages";

const Communication = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [scrollButton, setScrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const param = searchParams.get("dialogs");
  const [messages, setMessages] = useState([]);
  const scrollableRootRef = useRef(null);
  const lastScrollDistanceToBottomRef = useRef();

  const { data, isFetching: isFetchingMessages } = useGetMessageQuery({
    id: param,
    page: currentPage,
  });

  useEffect(() => {
    setCurrentPage(1);
    setMessages([]);
    return () => {
      setCurrentPage(1);
      setMessages([]);
      dispatch(clearSelectMessages());
    };
  }, [dispatch, param]);

  useEffect(() => {
    if (data?.results.length) {
      if (currentPage !== 1) {
        const mergedDataArray = [];

        [...data?.results, ...messages].forEach((item) => {
          const existingItem = mergedDataArray.find((mergedItem) => mergedItem.date === item.date);

          if (!_.isEmpty(existingItem)) {
            existingItem.messages = existingItem.messages
              .concat(item.messages)
              .sort((a, b) => b.id - a.id);
          } else {
            mergedDataArray.push({ date: item.date, messages: item.messages });
          }
        });

        setMessages(mergedDataArray);
      } else {
        setMessages(data?.results);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.results]);

  const [infiniteScroll, { rootRef }] = useInfiniteScroll({
    loading: isFetchingMessages,
    hasNextPage: !!data?.next,
    onLoadMore: () => setCurrentPage((pre) => pre + 1),
  });

  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [messages, rootRef]);

  const rootRefSetter = useCallback(
    (node) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef],
  );

  const dialogDown = useCallback(() => {
    scrollableRootRef.current.style.scrollBehavior = "smooth";
    scrollableRootRef.current.scrollTop = scrollableRootRef.current.scrollHeight;
    scrollableRootRef.current.style.scrollBehavior = "auto";
  }, []);

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
      if (rootNode.scrollTop + rootNode.clientHeight < rootNode.scrollHeight - 200) {
        setScrollButton(true);
      } else {
        setScrollButton(false);
      }
    }
  }, []);

  if (isFetchingMessages && currentPage === 1 && !messages.length) {
    return (
      <Box flexGrow={1} position="relative" bgcolor={theme.vars.palette.background.body}>
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress size="sm" variant="plain" />
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
          transition: "all 0.3s",
          background: theme.vars.palette.background.body,
          ...CustomScroll,
        }}
        ref={rootRefSetter}
        onScroll={handleRootScroll}
      >
        {!!data.next && (
          <Box position="absolute" top="5%" left="50%" zIndex={10} ref={infiniteScroll}>
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
        >
          <ListMessages messages={messages} setMessages={setMessages} data={data} />
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
