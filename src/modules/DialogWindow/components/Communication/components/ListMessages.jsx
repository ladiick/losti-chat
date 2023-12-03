import { memo } from "react";
import Message from "../../Message/Message";

const ListMessages = ({ message, handlerCurrentMessage }) => (
  <>
    <Message
      key={message.id}
      obj={message}
      margin={true}
      handlerCurrentMessage={() => handlerCurrentMessage(message)}
    />
  </>
);

export default memo(ListMessages);
