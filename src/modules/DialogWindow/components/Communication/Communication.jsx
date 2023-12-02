import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/joy";
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import _ from "underscore";
import { MyContext } from "../../../../Pages/Layout/Layout";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { clearSelectMessages, selectMessages } from "../../../../redux/slices/messageSlice";
import { useGetMessageQuery } from "../../api/messageApiSlice";
import { addNewMessage } from "../../helpers/helpersMessage";
import ListMessages from "./components/ListMessages";

function findPeopleIndex(people, chat) {
  return people.findIndex((obj) => {
    return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
  });
}

function Communication() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [scrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const param = searchParams.get("dialogs");
  const [messages, setMessages] = useState([]);
  const { newMessage } = useContext(MyContext);
  const people = useSelector((state) => state.people.people);
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [firstItemIndex, setFirstItemIndex] = useState(500);
  const virtuoso = useRef(null);

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
    if (data?.results?.length) {
      if (currentPage !== 1) {
        let mergedDataArray = [];
        mergedDataArray = [...(data?.results ?? []), ...messages];
        setFirstItemIndex((pre) => pre - data?.results?.length);
        setMessages(mergedDataArray);
      } else {
        setMessages(data?.results);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.results]);

  useEffect(() => {
    if (newMessage) {
      const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort((a, b) => a - b);
      const chat = [myId, Number(param)].sort((a, b) => a - b);
      const ind = findPeopleIndex(people, chat);

      if (ind !== -1) {
        const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort();
        const isEqual = _.isEqual(arr1, arr2);
        if (isEqual) {
          setMessages((pre) => addNewMessage(pre, newMessage));
        }
      }
    }
  }, [dispatch, myId, newMessage, people, setMessages, param]);

  const handlerCurrentMessage = useCallback(
    (obj) => {
      dispatch(selectMessages({ obj }));
    },
    [dispatch],
  );
  const prependItems = useCallback(() => {
    if (data?.next) {
      setCurrentPage((pre) => pre + 1);
      return true;
    }
    return false;
  }, [data?.next]);

  const itemContent = useCallback(
    (index, item) => {
      return (
        <ListMessages
          message={item}
          handlerCurrentMessage={handlerCurrentMessage}
          key={`${index}__${item?.id}`}
        />
      );
    },
    [handlerCurrentMessage],
  );

  const Scroller = forwardRef(function Scroller(props, ref) {
    return (
      <Box
        ref={ref}
        sx={{
          overflowX: "hidden",
          height: "100%",
          ...CustomScroll,
        }}
        {...props}
      />
    );
  });

  const List = forwardRef(function List(props, ref) {
    return (
      <Box
        ref={ref}
        sx={{
          width: "100%",
          m: "0 auto",
          maxWidth: "50rem",
          "@media (min-width: 1276px)": {
            width: "calc(100% - 25vh)",
          },
        }}
        {...props}
      />
    );
  });

  if (isFetchingMessages && currentPage === 1 && !messages?.length) {
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
      <Virtuoso
        styles={{
          height: "100%",
          background: theme.vars.palette.background.body,
        }}
        // overscan={20}
        // increaseViewportBy={40}
        firstItemIndex={Math.min(firstItemIndex, 0)}
        data={messages}
        startReached={prependItems}
        initialTopMostItemIndex={messages?.length - 1}
        itemContent={itemContent}
        ref={virtuoso}
        components={{ Scroller, List }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5.5rem",
          right: "1rem",
          opacity: scrollButton ? 1 : 0,
          transition: "all 0.3s",
        }}
      >
        <IconButton
          size="xxl"
          variant="solid"
          color="primary"
          onClick={() => {
            virtuoso.current.scrollToIndex({
              index: 500,
              align: "start",
              behavior: "smooth",
            });
            return false;
          }}
          bgcolor="surface"
          circle
        >
          <ArrowDownward />
        </IconButton>
      </Box>
    </>
  );
}

export default Communication;
