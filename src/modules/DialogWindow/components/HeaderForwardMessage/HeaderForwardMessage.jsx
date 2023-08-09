import React from "react";
import s from "./HeaderForwardMessage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";

import { useSearchParams } from "react-router-dom";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import { clearAnswerMessage, clearForwardMessage, clearMessage, sendMessagesOnChat } from "../../../../redux/slices/messageSlice";
import { forwardMessageFlag } from "../../../../redux/slices/navigationSlice";
import { changeDeclination } from "../../../../components/actions/changeDeclination";
import {ActionButton} from "../../../../components/ui/ActionButton/ActionButton";

const HeaderForwardMessage = () => {
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const dispatch = useDispatch();
  const { isMobile } = useMatchMedia();
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("dialogs");

  const answerMessage = () => {
    dispatch(
      sendMessagesOnChat({
        param,
        answerMessage: currentMessage[searchParams?.get("dialogs")][0],
      }),
    );
    dispatch(clearMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
  };

  const forwardMessage = () => {
    dispatch(forwardMessageFlag(true));
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
  };

  const forwardItHere = () => {
    dispatch(
      sendMessagesOnChat({
        param: searchParams?.get("dialogs"),
        forwardMessage: currentMessage[searchParams?.get("dialogs")],
      }),
    );
    dispatch(clearMessage({ param: searchParams.get("dialogs") }));
  };

  const clearSelectMessage = () => {
    dispatch(clearMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
  };

  return (
    <header className={s.header}>
      <span className={s.left__side}>
        {isMobile && "Выбрано"} {changeDeclination(currentMessage?.[param]?.length, "message")}
        <IoClose className={s.close} onClick={() => clearSelectMessage()} />
      </span>
      <div className={s.right__side}>
        <BsTrash3 size={16} style={!isMobile ? { marginRight: 15 } : { marginLeft: 10 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          {currentMessage[searchParams?.get("dialogs")].length === 1 ? (
            <ActionButton style={{ marginRight: 10 }} onClick={answerMessage}>
              Ответить
            </ActionButton>
          ) : (
            <ActionButton style={{ marginRight: 10 }} onClick={forwardItHere}>
              Переслать сюда
            </ActionButton>
          )}
          <ActionButton onClick={forwardMessage}>Переслать</ActionButton>
        </div>
      </div>
    </header>
  );
};

export default React.memo(HeaderForwardMessage);
