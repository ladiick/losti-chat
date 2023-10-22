import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DialogWindow from "../../modules/DialogWindow/DialogWindow";

import useMatchMedia from "../../components/hooks/useMatchMedia";
import DialogsUsers from "../../modules/DialogsUsers/DialogsUsers";
import LeftColumn from "../../modules/LeftColumn/LeftColumn";
import MiddleColumn from "../../modules/MiddleColumn/MiddleColumn";
import { openChatBlock } from "../../redux/slices/navigationSlice";

const Dialogs = () => {
  const chatActive = useSelector((state) => state.navigation.chat);
  const dispatch = useDispatch();
  const { isMobile } = useMatchMedia();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("dialogs")) {
      dispatch(openChatBlock(true));
    }
  }, [dispatch, searchParams.get("dialogs")]);

  useEffect(() => {
    document.title = "Сообщения";
  }, []);

  if (isMobile) {
    return (
      <>
        {!chatActive && <DialogsUsers />}
        {chatActive && <DialogWindow />}
      </>
    );
  }

  return (
    <>
      <LeftColumn />
      <MiddleColumn />
    </>
  );
};

export default Dialogs;
