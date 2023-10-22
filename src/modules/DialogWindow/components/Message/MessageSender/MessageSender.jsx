import React from "react";

import { Typography } from "@mui/joy";
import _ from "underscore";
import BlockMessage from "../BlockMessage/BlockMessage";
import MessageAnswer from "../MessageAnswer/MessageAnswer";
import MessageForward from "../MessageForward/MessageForward";
import MessageImage from "../MessageImage/MessageImage";

const MessageSender = ({ activeMessage, obj, handlerCurrentMessage, margin }) => {
  if (!_.isEmpty(obj?.images)) {
    return (
      <BlockMessage
        sx={{
          mb: margin ? "0.5rem" : "1rem",
        }}
        wrapperStyles={{
          p: 0,
          mb: "0.5rem",
        }}
        timeStyles={{
          position: "absolute",
          top: "auto",
          bottom: "0.5rem",
          right: "0.5rem",
          m: 0,
        }}
        pos="left"
        time={obj?.time}
        activeMessage={activeMessage}
        onClick={handlerCurrentMessage}
      >
        <MessageImage images={obj?.images} />
        {obj?.message && (
          <Typography
            component="span"
            sx={{
              p: ".3125rem .5rem .375rem",
              display: "inline-block",
            }}
          >
            {obj?.message}
          </Typography>
        )}
      </BlockMessage>
    );
  }
  return (
    <BlockMessage
      sx={{ mb: margin ? "0.5rem" : "1rem" }}
      activeMessage={activeMessage}
      pos="left"
      time={obj?.time}
      onClick={handlerCurrentMessage}
    >
      {!_.isEmpty(obj?.answer) && <MessageAnswer answer={obj?.answer} obj={obj?.answer?.sender} />}

      {obj?.message && (
        <Typography component="span" display="inline-block">
          {obj?.message}
        </Typography>
      )}

      {!_.isEmpty(obj?.images) && <MessageImage images={obj?.images} />}

      {!_.isEmpty(obj?.forward) && <MessageForward forward={obj} count={0} />}
    </BlockMessage>
  );
};

export default React.memo(MessageSender);
