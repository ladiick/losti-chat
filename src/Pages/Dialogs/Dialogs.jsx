import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DialogWindow from "../../modules/DialogWindow/DialogWindow";

import DialogsUsers from "../../modules/DialogsUsers/DialogsUsers";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import { openChatBlock } from "../../redux/slices/navigationSlice";
import WhoForwardMessage from "../../modules/AllModals/WhoForwardMessage/WhoForwardMessage";

const Dialogs = () => {
  const chatActive = useSelector((state) => state.navigation.chat);
  const dispatch = useDispatch();
  const { isMobile } = useMatchMedia();
  const [searchParams, setSearchParams] = useSearchParams();
  const forwardMessageFlag = useSelector((state) => state.navigation.forwardMessageFlag);

  useEffect(() => {
    if (searchParams.get("dialogs")) {
      dispatch(openChatBlock(true));
    }
  }, [searchParams.get("dialogs")]);

  useEffect(() => {
    document.title = "Сообщения";
  }, []);

  if (isMobile) {
    return (
      <>
        {!chatActive && <DialogsUsers />}
        {chatActive && <DialogWindow />}
        {forwardMessageFlag && <WhoForwardMessage />}
      </>
    );
  }

  return (
    <>
      <DialogsUsers />
      <DialogWindow />
      {forwardMessageFlag && <WhoForwardMessage />}
    </>
  );
};

export default Dialogs;
