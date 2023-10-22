import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectedMessages } from "../../../../redux/slices/messageSlice";
import MessageDate from "./MessageDate/MessageDate";
import MessageRecipient from "./MessageRecipient/MessageRecipient";
import MessageSender from "./MessageSender/MessageSender";

const Message = ({ obj, handlerCurrentMessage, margin }) => {
  const selectedMessage = useSelector((state) => selectedMessages(state));
  const [searchParams] = useSearchParams();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const param = searchParams.get("dialogs");

  const activeMessage = useMemo(() => selectedMessage.includes(obj), [param, obj, selectedMessage]);

  if (obj?.recip?.pk === myId) {
    return (
      <MessageSender
        margin={margin}
        obj={obj}
        handlerCurrentMessage={handlerCurrentMessage}
        activeMessage={activeMessage}
      />
    );
  }

  if (obj?.sender?.pk === myId) {
    return (
      <MessageRecipient
        margin={margin}
        obj={obj}
        handlerCurrentMessage={handlerCurrentMessage}
        activeMessage={activeMessage}
      />
    );
  }

  if (obj?.type === "Date") {
    return <MessageDate message={obj.message} />;
  }
};

export default React.memo(Message);
