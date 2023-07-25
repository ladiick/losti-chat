import s from "./Communication.module.scss";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearMessage, currentMessage, setMessage, setWidthDialogBlock } from "../../../../redux/slices/messageSlice";
import _ from "underscore";
import { MyContext } from "../../../Layout/Layout";
import { useSearchParams } from "react-router-dom";
import { useGetMessageQuery, usePaginationMutation } from "./api/messageApiSlice";
import { addTimeMessage } from "../../helpers/addTimeMessage";
import LoaderWrapper from "../../../../components/ui/LoaderWrapper/LoaderWrapper";
import { FiArrowDown } from "react-icons/fi";
import { helperMessage } from "../../../../utils/utils";
import Loader from "../../../../components/ui/Loader/Loader";

const Communication = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.message);
  const myId = useSelector((state) => state.user.aboutUser.id);

  const people = useSelector((state) => state.people.people);
  let { newMessage } = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [scrollButton, setScrollButton] = useState(false);

  const { data, isLoading } = useGetMessageQuery(searchParams.get("dialogs"));

  const [pagination, { isLoading: Load }] = usePaginationMutation();
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

  if (isLoading) {
    return (
      <div className={s.block__messages}>
        <LoaderWrapper top={Load ? 1 : 0}>
          <Loader visible={isLoading || Load} />
        </LoaderWrapper>
      </div>
    );
  }

  return (
    <div className={s.block__messages} ref={getBlockMessage}>
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
        <div className={s.button__down} onClick={dialogDown}>
          <span>
            <FiArrowDown />
          </span>
        </div>
      )}
    </div>
  );
};

export default Communication;
