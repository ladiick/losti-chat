import { Box, Stack, useTheme } from "@mui/joy";
import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import _ from "underscore";
import {
  answerMessage,
  clearDialog,
  fileMessage,
  forwardMessage,
  selectedMessages,
  textMessage,
} from "../../../../redux/slices/messageSlice";
import { MyContext } from "../../../Layout/Layout";
import BlockAnswerMessage from "../BlockAnswerMessage/BlockAnswerMessage";
import BlockFilesMessage from "../BlockFilesMessage/BlockFilesMessage";
import ButtonSendMessage from "./components/ButtonSendMessage/ButtonSendMessage";
import InputContentEditable from "./components/InputContentEditable/InputContentEditable";
import InputUploadFiles from "./components/InputUploadFiles/InputUploadFiles";
import SmileMenu from "./components/SmileMenu/SmileMenu";
import ToolBar from "./components/ToolBar/ToolBar";

const BlockInputs = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const param = searchParams.get("dialogs");
  const { socket } = useContext(MyContext);
  const selectedMessage = useSelector((state) => selectedMessages(state));
  const content = useSelector((state) => textMessage(state, param));
  const answerMessages = useSelector((state) => answerMessage(state, param));
  const imagesMessages = useSelector((state) => fileMessage(state, param));
  const forwardMessages = useSelector((state) => forwardMessage(state, param));
  const [sendDownEnter, setSendEnter] = useState(false);

  const sendMessage = useCallback(() => {
    if (content === "" && _.isEmpty(forwardMessages) && _.isEmpty(answerMessages)) {
      return;
    }

    const countMessage = Math.ceil(content.length / 4000) || 1;
    for (let i = 0; i < countMessage; i++) {
      socket?.send(
        JSON.stringify({
          request_id: new Date().getTime(),
          message: content.slice(i * 4000, i * 4000 + 4000),
          action: "create_dialog_message",
          forward: i === countMessage - 1 ? forwardMessages?.map((a) => a.id) : [],
          answer: i === countMessage - 1 ? answerMessages?.id : {},
          recipient: searchParams.get("dialogs"),
        }),
      );
    }

    dispatch(clearDialog({ id: param }));
  }, [answerMessages, content, dispatch, forwardMessages, param, searchParams, socket]);

  return (
    <Box
      mb="1.25rem"
      px="1rem"
      sx={{
        "@media (max-width: 768px)": {
          mb: "0",
          px: "0",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          maxWidth: "50rem",
          width: selectedMessage.length ? "70%" : "100%",
          m: "0 auto",
          gap: "0.5rem",
          transition: "all 0.3s",
          "@media (min-width: 1276px)": {
            width: selectedMessage.length ? "calc(100% - 45vw)" : "calc(100% - 25vw)",
          },
        }}
      >
        <Box
          bgcolor={theme.vars.palette.background.surface}
          sx={{
            width: "100%",
            m: "0",
            borderRadius: "sm",
            "@media (max-width: 768px)": {
              borderRadius: "0",
            },
          }}
        >
          {!_.isEmpty(answerMessages) && <BlockAnswerMessage message={answerMessages} />}

          <Stack direction="row" alignItems="center" width="100%" sx={{ minHeight: "3.5rem" }}>
            {selectedMessage.length ? (
              <ToolBar />
            ) : (
              <>
                <InputUploadFiles />
                <InputContentEditable
                  sendMessage={sendMessage}
                  setSendEnter={setSendEnter}
                  sendDownEnter={sendDownEnter}
                />
                <SmileMenu />
              </>
            )}
          </Stack>
          {!_.isEmpty(imagesMessages) && <BlockFilesMessage files={imagesMessages} />}
        </Box>
        {!selectedMessage.length && (
          <ButtonSendMessage
            sendMessage={sendMessage}
            setSendEnter={setSendEnter}
            sendDownEnter={sendDownEnter}
          />
        )}
      </Stack>
    </Box>
  );
};

export default BlockInputs;
