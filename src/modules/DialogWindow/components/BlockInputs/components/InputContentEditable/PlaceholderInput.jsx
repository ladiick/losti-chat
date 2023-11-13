import { Box, useTheme } from "@mui/joy";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { textMessage } from "../../../../../../redux/slices/messageSlice";
const PlaceholderInput = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");
  const content = useSelector((state) => textMessage(state, param));

  return (
    <Box
      sx={{
        position: "absolute",
        top: "1rem",
        userSelect: "none",
        cursor: "text",
        pointerEvents: "none",
        transition: "all 0.3s",
        transform: content ? "translateX(50%)" : "translateX(0)",
        opacity: content ? 0 : 1,
        visibility: content ? "hidden" : "visible",
        [theme.breakpoints.down("sm")]: { top: 0 },
      }}
    >
      Напишите сообщение...
    </Box>
  );
};

export default PlaceholderInput;
