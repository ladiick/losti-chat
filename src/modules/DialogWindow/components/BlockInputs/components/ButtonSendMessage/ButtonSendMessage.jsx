import { CancelScheduleSend, Send } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/joy";
import { memo, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { answerMessage, textMessage } from "../../../../../../redux/slices/messageSlice";
import { MyContext } from "../../../../../Layout/Layout";

const ButtonSendMessage = ({ sendMessage, setSendEnter, sendDownEnter }) => {
  const theme = useTheme();
  const refSend = useRef();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");
  const { statusSocket } = useContext(MyContext);

  const content = useSelector((state) => textMessage(state, param));

  const answerMessages = useSelector((state) => answerMessage(state, param));

  const disabledBtn =
    statusSocket !== "ready" || (content.length === 0 && answerMessages.length !== 1);

  useEffect(() => {
    if (sendDownEnter) {
      refSend.current?.click();
      setSendEnter(false);
    }
  }, [sendDownEnter, setSendEnter]);

  return (
    <IconButton
      ref={refSend}
      onClick={sendMessage}
      color={disabledBtn ? "neutral" : "primary"}
      disabled={disabledBtn}
      variant="solid"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        height: "3.5rem",
        width: "3.5rem",
        flexShrink: 0,
        borderRadius: "50%",
        backgroundColor: theme.vars.palette.background.surface,
      }}
    >
      {statusSocket === "ready" ? <Send /> : <CancelScheduleSend />}
    </IconButton>
  );
};

export default memo(ButtonSendMessage);
