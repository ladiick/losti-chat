import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalBlock } from "../../../redux/slices/navigationSlice";
import { useSearchParams } from "react-router-dom";

import { setForwardMessageIfMany } from "../../../redux/slices/messageSlice";
import MessageForward from "../../../modules/DialogWindow/components/Message/MessageForward/MessageForward";
import ModalDialog from "../../../components/ui/Modal/ModalDialog";

const ViewForwardedMessage = () => {
  const isVisible = useSelector((state) => state.navigation.modal.viewForwardMessage);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const messages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.forwardMessage);
  const manyForwardMessage = useSelector((state) => state.message.forwardManyMessage);

  const closeFunc = () => {
    dispatch(openModalBlock({ viewForwardMessage: false }));
    dispatch(setForwardMessageIfMany(""));
  };

  return (
    <ModalDialog title="Переслать сообщения" open={isVisible} closeFunc={closeFunc}>
      {manyForwardMessage ? <MessageForward forward={manyForwardMessage} count={0} view={true} /> : <MessageForward forward={messages} count={0} view={true} />}
    </ModalDialog>
  );
};

export default ViewForwardedMessage;
