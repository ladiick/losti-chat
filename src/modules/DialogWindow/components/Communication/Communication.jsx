import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/joy";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import _ from "underscore";
import { MyContext } from "../../../../Pages/Layout/Layout";
import { clearSelectMessages, selectMessages } from "../../../../redux/slices/messageSlice";
import { useGetMessageQuery } from "../../api/messageApiSlice";
import { addNewMessage } from "../../helpers/helpersMessage";
import ListMessages from "./components/ListMessages";

function findPeopleIndex(people, chat) {
  return people.findIndex((obj) => {
    return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
  });
}

const Communication = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [scrollButton, setScrollButton] = useState(false);
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

        // [...data?.results, ...messages].forEach((item) => {
        //   const existingItem = mergedDataArray.find((mergedItem) => mergedItem.date === item.date);

        //   if (!_.isEmpty(existingItem)) {
        //     existingItem.messages = existingItem.messages
        //       .concat(item.messages)
        //       .sort((a, b) => b.id - a.id);
        //   } else {
        //     mergedDataArray.push({ date: item.date, messages: item.messages });
        //   }
        // });
        mergedDataArray = [...data?.results, ...messages];
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
    }
    return false;
  }, [data?.next]);

  const itemContent = useCallback((index, item) => {
    return (
      <ListMessages message={item} handlerCurrentMessage={handlerCurrentMessage} key={index} />
    );
  }, []);
  console.log("render", virtuoso);
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
        alignToBottom
        style={{
          height: "100%",
          overflowX: "hidden",
          overscrollBehavior: "contain",
        }}
        firstItemIndex={firstItemIndex}
        data={messages}
        startReached={prependItems}
        initialTopMostItemIndex={messages?.length - 1}
        itemContent={itemContent}
        // increaseViewportBy={{ top: 400 }}
        rangeChanged={(item) => setScrollButton(item.startIndex <= 515)}
        ref={virtuoso}
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
              align: "end",
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
};

export default Communication;
