import React from "react";
import _ from "underscore";
import BlockMessage from "../BlockMessage/BlockMessage";
import MessageForward from "../MessageForward/MessageForward";
import Text from "../../../../../components/ui/Text/Text";
import MessageImage from "../MessageImage/MessageImage";
import BlockAnswerMessage from "../../BlockAnswerMessage/BlockAnswerMessage";

const MessageRecipient = React.memo(({ activeMessage, obj, handlerCurrentMessage, margin }) => {
  return (
    <BlockMessage style={margin ? {} : { marginBottom: 15 }} pos={"right"} time={obj?.time} activeMessage={activeMessage} onClick={handlerCurrentMessage}>
      {obj?.message && <Text>{obj?.message}</Text>}

      {!_.isEmpty(obj?.images) && <MessageImage images={obj?.images} />}

      {obj?.forward?.length !== 0 && <MessageForward forward={obj} count={0} />}

      {!_.isEmpty(obj?.answer) && <BlockAnswerMessage message={obj?.answer} answer />}
    </BlockMessage>
  );
});

export default MessageRecipient;
