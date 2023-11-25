import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectedMessages } from "../../../../redux/slices/messageSlice";
import MessageDate from "./MessageDate/MessageDate";
import MessageRecipient from "./MessageRecipient/MessageRecipient";
import MessageSender from "./MessageSender/MessageSender";

const Message = ({ obj, handlerCurrentMessage, margin }) => {
  const selectedMessage = useSelector((state) => selectedMessages(state));
  const myId = useSelector((state) => state.user.aboutUser.id);

  const activeMessage = useMemo(() => selectedMessage.includes(obj), [obj, selectedMessage]);
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
