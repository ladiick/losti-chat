import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ModalDialog from "../../../components/ui/Modal/ModalDialog";
import { forwardMessage, setForwardMessageIfMany } from "../../../redux/slices/messageSlice";
import { modalsSelectors, setDetailedForwardModal } from "../../../redux/slices/modalsSlice";
import MessageForward from "../components/Message/MessageForward/MessageForward";

const ViewForwardedMessage = () => {
  const { isOpenDetailedForwardModal } = useSelector((state) => modalsSelectors(state));
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");

  const messages = useSelector((state) => forwardMessage(state, param));
  const manyForwardMessage = useSelector((state) => state.message.forwardManyMessage);

  const closeFunc = () => {
    dispatch(setDetailedForwardModal(false));
    dispatch(setForwardMessageIfMany(""));
  };

  return (
    <ModalDialog
      title="Переслать сообщения"
      open={isOpenDetailedForwardModal}
      closeFunc={closeFunc}
    >
      {manyForwardMessage ? (
        <MessageForward forward={manyForwardMessage} count={0} view={true} />
      ) : (
        <MessageForward forward={messages} count={0} view={true} />
      )}
    </ModalDialog>
  );
};

export default ViewForwardedMessage;
