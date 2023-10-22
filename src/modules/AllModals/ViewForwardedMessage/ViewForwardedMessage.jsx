import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { openModalBlock } from "../../../redux/slices/navigationSlice";

import ModalDialog from "../../../components/ui/Modal/ModalDialog";
import MessageForward from "../../../modules/DialogWindow/components/Message/MessageForward/MessageForward";
import { forwardMessage, setForwardMessageIfMany } from "../../../redux/slices/messageSlice";

const ViewForwardedMessage = () => {
  const isVisible = useSelector((state) => state.navigation.modal.viewForwardMessage);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");

  const messages = useSelector((state) => forwardMessage(state, param));
  const manyForwardMessage = useSelector((state) => state.message.forwardManyMessage);

  const closeFunc = () => {
    dispatch(openModalBlock({ viewForwardMessage: false }));
    dispatch(setForwardMessageIfMany(""));
  };

  return (
    <ModalDialog title="Переслать сообщения" open={isVisible} closeFunc={closeFunc}>
      {manyForwardMessage ? (
        <MessageForward forward={manyForwardMessage} count={0} view={true} />
      ) : (
        <MessageForward forward={messages} count={0} view={true} />
      )}
    </ModalDialog>
  );
};

export default ViewForwardedMessage;
