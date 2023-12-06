import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/joy";
import React, {
  Fragment,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import _ from "underscore";
import { MyContext } from "../../../../Pages/Layout/Layout";
import { clearSelectMessages, selectMessages } from "../../../../redux/slices/messageSlice";
import { useGetMessageQuery } from "../../api/messageApiSlice";
import { addNewMessage } from "../../helpers/helpersMessage";
import styles from "./Communication.module.scss";
import ListMessages from "./components/ListMessages";

function findPeopleIndex(people, chat) {
  return people.findIndex((obj) => {
    return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
  });
}

function Communication() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [scrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const { newMessage } = useContext(MyContext);
  const people = useSelector((state) => state.people.people);
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const virtuoso = useRef(null);
  const param = searchParams.get("dialogs");

  const { data, isFetching: isFetchingMessages } = useGetMessageQuery({
    id: param,
    page: currentPage,
  });

  useEffect(
    () => () => {
      setFirstItemIndex(0);
      setCurrentPage(1);
      setMessages([]);
      dispatch(clearSelectMessages());
    },
    [dispatch, param],
  );

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
    if (data?.next && !isFetchingMessages) {
      setCurrentPage((pre) => pre + 1);
    }
    return false;
  }, [data?.next, isFetchingMessages]);

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

  const List = forwardRef(function List(props, ref) {
    return (
      <Box
        ref={ref}
        sx={{
          width: "100%",
          m: "0 auto",
          maxWidth: "50rem",
          overflow: "hidden",
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
      <Box flexGrow={1} position="relative" bgcolor="background.body">
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress size="sm" variant="plain" />
        </Box>
      </Box>
    );
  }

  return (
    <Fragment key={param}>
      <Virtuoso
        className={styles.scroll}
        firstItemIndex={Math.min(firstItemIndex, 0)}
        data={messages}
        startReached={prependItems}
        initialTopMostItemIndex={messages?.length - 1}
        totalCount={messages?.length}
        itemContent={itemContent}
        ref={virtuoso}
        components={{ List }}
        followOutput={(isAtBottom) => {
          if (isAtBottom) {
            return true;
          } else {
            return false;
          }
        }}
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
    </Fragment>
  );
}

export default Communication;
