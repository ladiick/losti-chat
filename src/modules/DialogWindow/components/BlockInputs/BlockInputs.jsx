import { Box, Stack, useTheme } from "@mui/joy";
import React, { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import _ from "underscore";
import BlockAnswerMessage from "../BlockAnswerMessage/BlockAnswerMessage";
import BlockFilesMessage from "../BlockFilesMessage/BlockFilesMessage";
import ButtonSendMessage from "./components/ButtonSendMessage/ButtonSendMessage";
import InputContentEditable from "./components/InputContentEditable/InputContentEditable";
import InputUploadFiles from "./components/InputUploadFiles/InputUploadFiles";
import SmileMenu from "./components/SmileMenu/SmileMenu";
import ToolBar from "./components/ToolBar/ToolBar";
import { MyContext } from '../../../Layout/Layout'
import { sendMessagesOnChat } from '../../../../redux/slices/messageSlice'

const BlockInputs = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const currentMessageLength = useSelector((state) => state.message?.currentMessage?.[searchParams.get("dialogs")]?.length);
  const { socket } = useContext(MyContext);
  const dispatch = useDispatch();

  const content = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.sendMessage || "");

  const answerMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.answerMessage || {});

  const imagesMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.file || []);

  const forwardMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.forwardMessage);


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

    dispatch(
      sendMessagesOnChat({
        param: searchParams.get("dialogs"),
        message: "",
        forwardMessage: [],
        answerMessage: {},
      }),
    );
  }, [answerMessages, content, dispatch, forwardMessages, searchParams, socket]);

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
          width: currentMessageLength ? "80%" :"100%",
          m: "0 auto",
          gap: "0.5rem",
          transition: 'all .3s',
          "@media (min-width: 1276px)": {
            width: "calc(100% - 25vh)",
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
            {currentMessageLength ? (
              <ToolBar />
            ) : (
              <>
                <InputUploadFiles />
                <InputContentEditable sendMessage={sendMessage} />
                <SmileMenu />
              </>
            )}
          </Stack>
          {!_.isEmpty(imagesMessages) && <BlockFilesMessage files={imagesMessages} />}
        </Box>
        {!currentMessageLength && <ButtonSendMessage sendMessage={sendMessage} />}
      </Stack>
    </Box>
  );
};

export default BlockInputs;
