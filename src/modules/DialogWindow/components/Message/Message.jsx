import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import _ from "underscore";
import MessageDate from "./MessageDate/MessageDate";
import MessageRecipient from "./MessageRecipient/MessageRecipient";
import MessageSender from "./MessageSender/MessageSender";

const Message = React.memo(({ obj, handlerCurrentMessage, margin }) => {
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const [searchParams] = useSearchParams();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const param = searchParams.get("dialogs");

  const activeMessage = useMemo(() => {
    if (currentMessage?.[param]) {
      const index = currentMessage?.[param]?.findIndex((message) => _.isEqual(message, obj));

      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
  }, [param, obj, currentMessage]);

  if (obj?.recip?.pk === myId) {
    return <MessageSender margin={margin} obj={obj} handlerCurrentMessage={handlerCurrentMessage} activeMessage={activeMessage} />;
  }

  if (obj?.sender?.pk === myId) {
    return <MessageRecipient margin={margin} obj={obj} handlerCurrentMessage={handlerCurrentMessage} activeMessage={activeMessage} />;
  }

  if (obj?.type === "Date") {
    return <MessageDate message={obj.message} />;
  }
});

export default Message;
