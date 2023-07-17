import React from "react";

import BlockMessage from "../BlockMessage/BlockMessage";
import MessageForward from "../MessageForward/MessageForward";
import Text from "../../../../../components/ui/Text/Text";
import _ from "underscore";
import MessageImage from "../MessageImage/MessageImage";
import BlockAnswerMessage from "../../BlockAnswerMessage/BlockAnswerMessage";

const MessageSender = React.memo(({ activeMessage, obj, handlerCurrentMessage, margin }) => {
  return (
    <BlockMessage style={margin ? {} : { marginBottom: 15 }} activeMessage={activeMessage} pos={"left"} time={obj?.time} onClick={handlerCurrentMessage}>
      {obj?.message && <Text>{obj?.message}</Text>}

      {obj?.images?.length !== 0 && <MessageImage images={obj?.images} />}

      {obj?.forward?.length !== 0 && <MessageForward forward={obj} count={0} />}

      {!_.isEmpty(obj?.answer) && <BlockAnswerMessage message={obj} answer />}
    </BlockMessage>
  );
});

export default MessageSender;
