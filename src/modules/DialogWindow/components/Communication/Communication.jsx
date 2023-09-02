import { ArrowDownward } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/joy";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "underscore";
import UseMatchMedia from "../../../../components/hooks/useMatchMedia";
import { clearMessage, currentMessage, setMessage, setWidthDialogBlock } from "../../../../redux/slices/messageSlice";
import { helperMessage } from "../../../../utils/utils";
import { MyContext } from "../../../Layout/Layout";
import { addTimeMessage } from "../../helpers/addTimeMessage";
import Message from "../Message/Message";
import { useGetMessageQuery, usePaginationMutation } from "./api/messageApiSlice";

const Communication = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.message);
  const myId = useSelector((state) => state.user.aboutUser.id);
  const { isMobile } = UseMatchMedia();
  const people = useSelector((state) => state.people.people);
  let { newMessage } = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [scrollButton, setScrollButton] = useState(false);

  const { data, isFetching: isFetchingMessages } = useGetMessageQuery(searchParams.get("dialogs"), {
    refetchOnMountOrArgChange: true,
  });

  const [pagination, { isFetching: isLoadingPagination }] = usePaginationMutation();
  const [currentPage, setCurrentPage] = useState(2);
  const [fetching, setFetching] = useState(false);

  const param = searchParams.get("dialogs");

  const [refBlockMessage, setRefBlockMessage] = useState(null);

  const getBlockMessage = useCallback((ref) => {
    if (ref) {
      setRefBlockMessage(ref);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(2);
    setFetching(false);

    return () => {
      dispatch(clearMessage({ param }));
    };
  }, [searchParams.get("dialogs")]);

  useEffect(() => {
    const paginationFunc = async () => {
      setFetching(false);
      await pagination({ id: searchParams.get("dialogs"), page: currentPage });
      setCurrentPage((pre) => pre + 1);
    };
    if (fetching && message?.next) {
      paginationFunc();
    }
  }, [fetching]);

  const dialogDown = () => {
    refBlockMessage.scrollTop = refBlockMessage.scrollHeight;
  };

  const scrollHandler = useCallback(
    (e) => {
      if (e.target.scrollTop + e.target.clientHeight < e.target.scrollHeight) {
        setScrollButton(true);
      }

      if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 200) {
        setScrollButton(false);
      }

      if (e.target.scrollTop < 200 && message?.next) {
        setFetching(true);
        refBlockMessage?.removeEventListener("scroll", scrollHandler);
      }
    },
    [message?.next],
  );

  useEffect(() => {
    if (refBlockMessage) {
      refBlockMessage?.addEventListener("scroll", scrollHandler);
      dispatch(setWidthDialogBlock(refBlockMessage.clientWidth));
    }
    return () => {
      if (refBlockMessage) {
        refBlockMessage?.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [scrollHandler, message]);

  useEffect(() => {
    if (newMessage && message?.results?.[0]?.id !== newMessage.id) {
      const arr1 = [newMessage.recip.pk, newMessage.sender.pk].sort();
      const chat = [myId, Number(searchParams.get("dialogs"))].sort();

      let ind = people.findIndex((obj) => {
        return _.isEqual([obj.sender.pk, obj.recip.pk].sort(), chat);
      });

      if (ind !== -1) {
        const arr2 = [people[ind].recip.pk, people[ind].sender.pk].sort();
        const isEqual = _.isEqual(arr1, arr2);
        if (isEqual) {
          dispatch(setMessage(newMessage));
        }
      }
    }
  }, [newMessage]);

  const handlerCurrentMessage = useCallback(
    (obj) => {
      dispatch(currentMessage({ param, obj }));
    },
    [dispatch, param],
  );

  const outputMessages = useMemo(() => {
    return addTimeMessage(message?.results);
  }, [message?.results]);

  const theme = useTheme();

  if (isFetchingMessages) {
    return (
      <Box flexGrow={1} position="relative" bgcolor={theme.vars.palette.background.body}>
        <Box position="absolute" top="50%" left="50%">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      bgcolor={theme.vars.palette.background.body}
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
        "&::-webkit-scrollbar-track": {
          transition: "all .3s",
          borderRadius: "sm",
        },
        "&::-webkit-scrollbar": {
          transition: "all .3s",
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          transition: "all .3s",
          borderRadius: "sm",
          background: theme.vars.palette.background.level2,
        },
      }}
    >
      <Box
        sx={{
          width: isMobile ? "100vw" : "calc(100% - 25vh)",
          m: "0 auto",
          height: "100%",
          maxWidth: "50rem",
        }}
        flexGrow={1}
        position="relative"
        ref={getBlockMessage}
      >
        {outputMessages
          .map((obj, index, arr) =>
            helperMessage(arr?.[index], arr?.[index - 1]) ? (
              <Message
                key={obj?.type === "Date" ? `${obj.time}_time` : obj.id}
                obj={obj}
                margin={true}
                handlerCurrentMessage={() => handlerCurrentMessage(obj)}
              />
            ) : (
              <Message
                key={obj?.type === "Date" ? `${obj.time}_time` : obj.id}
                obj={obj}
                margin={false}
                handlerCurrentMessage={() => handlerCurrentMessage(obj)}
              />
            ),
          )
          .reverse()}

        {scrollButton && (
          <Box sx={{ width: "100%", position: "sticky", display: "flex", justifyContent: "flex-end", bottom: "0.5rem" }}>
            <IconButton size="lg" variant="soft" onClick={dialogDown}>
              <ArrowDownward />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Communication;
