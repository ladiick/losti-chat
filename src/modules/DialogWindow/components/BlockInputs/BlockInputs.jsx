import { AttachFile, CancelScheduleSend, Send } from "@mui/icons-material";
import { Box, FormControl, FormLabel, Input, Stack, useTheme } from "@mui/joy";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import _ from "underscore";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import { sendMessagesOnChat } from "../../../../redux/slices/messageSlice";
import { MyContext } from "../../../Layout/Layout";
import BlockAnswerMessage from "../BlockAnswerMessage/BlockAnswerMessage";
import BlockFilesMessage from "../BlockFilesMessage/BlockFilesMessage";
import BlockForwardMessages from "../BlockForwardMessages/BlockForwardMessages";
import PlaceholderInput from "./PlaceholderInput";

const inputHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  m: -1,
  border: 0,
  p: 0,
  whiteSpace: "nowrap",
  clipPath: " inset(100%)",
  clip: "rect(0 0 0 0)",
  overflow: "hidden",
};

const BlockInputs = () => {
  const { isMobile } = useMatchMedia();
  const theme = useTheme();
  const { socket, statusSocket } = useContext(MyContext);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const forwardMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.forwardMessage);

  const answerMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.answerMessage || {});

  const imagesMessages = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.file || []);

  const content = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.sendMessage || "");

  const refSend = useRef();

  const refContentEditable = useRef("");

  const downRandomKey = ({ key }) => {
    if (/^[a-zа-яё0-9]$/i.test(key)) {
      refContentEditable?.current?.el?.current?.focus();
    }
  };

  useEffect(() => {
    refContentEditable?.current?.el?.current?.focus();
    window.addEventListener("keydown", downRandomKey);
    return () => window.removeEventListener("keydown", downRandomKey);
  }, []);

  const onContentChange = useCallback(
    (evt) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] },
      };
      if (evt.currentTarget.innerHTML.length > 20000) {
        dispatch(
          sendMessagesOnChat({
            param: searchParams.get("dialogs"),
            message: "",
          }),
        );
      }
      dispatch(
        sendMessagesOnChat({
          param: searchParams.get("dialogs"),
          message: sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf),
        }),
      );
    },
    [dispatch, searchParams.get("dialogs")],
  );
  const sendMessage = () => {
    if (content === "" && forwardMessages?.length === 0 && !_.isEmpty(answerMessages)) {
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
  };
  const handlerKeyDown = (e) => {
    // if(isMobile){
    //     console.log(e)
    //
    // }
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      refSend?.current?.click();
    }
  };

  const handlerFilesUploader = (file) => {
    console.log(file.target.files);
    dispatch(
      sendMessagesOnChat({
        param: searchParams.get("dialogs"),
        file: file.target.files,
      }),
    );
  };

  return (
    <Box mb="1.25rem">
      <Box
        bgcolor={theme.vars.palette.background.surface}
        sx={{
          width: isMobile ? "100vw" : "calc(100% - 25vh)",
          m: "0 auto",
          maxWidth: "50rem",
          borderRadius: "sm",
        }}
      >
        {answerMessages && Object.keys(answerMessages)?.length !== 0 && <BlockAnswerMessage message={answerMessages} />}

        <Stack direction="row" alignItems="center" width="100%">
          <FormControl sx={{ ml: "0.75rem", alignSelf: "flex-end", height: "3.5rem", justifyContent: "center", flexShrink: 0 }}>
            <FormLabel
              sx={{
                m: 0,
                cursor: "pointer",
                "& svg": {
                  transform: "rotate(45deg)",
                  width: 30,
                  height: 30,
                },
                "& svg:hover": {
                  fill: theme.vars.palette.primary.solidBg,
                },
              }}
            >
              <AttachFile />
            </FormLabel>
            <Input type="file" sx={inputHidden} multiple={true} onChange={handlerFilesUploader} />
          </FormControl>

          <Box
            position="relative"
            sx={{
              flexGrow: 1,
              py: "1rem",
              pl: "0.75rem",
            }}
          >
            <Box
              component={ContentEditable}
              html={content}
              ref={refContentEditable}
              onKeyDown={handlerKeyDown}
              contentEditable={true}
              role="textbox"
              onChange={onContentChange}
              sx={{
                border: "none",
                outline: "none",
                resize: "none",
                wordBreak: "break-word",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                maxHeight: "12rem",
                overflowY: "auto",
                overflowX: "hidden",
                unicodeBidi: "plaintext",
                "&::-webkit-scrollbar-track": {
                  transition: "all .3s",
                  borderRadius: "sm",
                },
                "&::-webkit-scrollbar": {
                  transition: "all .3s",
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  transition: "all .3s",
                  borderRadius: "sm",
                  background: theme.vars.palette.background.level2,
                },
              }}
            />
            {content === "" && <PlaceholderInput />}
          </Box>
          <Box
            ref={refSend}
            onClick={() => sendMessage()}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "flex-end",
              height: "3.5rem",
              width: "3.5rem",
              flexShrink: 0,
              "& svg": {
                width: 30,
                height: 30,
              },
            }}
          >
            {statusSocket === "ready" ? (
              <Send sx={{ fill: theme.vars.palette.primary.solidBg, cursor: "pointer" }} />
            ) : (
              <CancelScheduleSend sx={{ fill: theme.vars.palette.danger.plainColor, cursor: "not-allowed" }} />
            )}
          </Box>
        </Stack>

        {forwardMessages && forwardMessages.length !== 0 && <BlockForwardMessages message={forwardMessages} />}

        {imagesMessages?.length !== 0 && <BlockFilesMessage files={imagesMessages} />}
      </Box>
    </Box>
  );
};

export default BlockInputs;
