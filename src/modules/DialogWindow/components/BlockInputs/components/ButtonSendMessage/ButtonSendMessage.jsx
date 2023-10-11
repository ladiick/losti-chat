import { CancelScheduleSend, Send } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/joy";
import { memo, useContext, useRef } from "react";
import { MyContext } from "../../../../../Layout/Layout";

const ButtonSendMessage = ({ sendMessage }) => {
  const theme = useTheme();
  const refSend = useRef();

  const { statusSocket } = useContext(MyContext);

  return (
    <IconButton
      ref={refSend}
      onClick={sendMessage}
      color={"primary"}
      disabled={statusSocket !== "ready"}
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
