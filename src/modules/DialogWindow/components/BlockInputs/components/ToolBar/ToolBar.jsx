import { Close, Delete, Reply, ReplyAll } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changeDeclination } from "../../../../../../components/actions/changeDeclination";
import {
  clearSelectMessages,
  clearAnswerMessage,
  clearForwardMessage,
  selectedMessages,
  onChangeAnswerDialog,
} from "../../../../../../redux/slices/messageSlice";
import { setForwardModal } from "../../../../../../redux/slices/navigationSlice";

const ToolBar = () => {
  const selectedMessage = useSelector((state) => selectedMessages(state));
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");

  const answerMessage = () => {
    dispatch(
      onChangeAnswerDialog({
        id: param,
        answer: selectedMessage[0],
      }),
    );
    dispatch(clearSelectMessages());
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
  };

  const forwardMessage = () => {
    dispatch(setForwardModal(true));
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
  };

  const clearSelectMessage = () => {
    dispatch(clearSelectMessages());
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
  };

  return (
    <>
      <IconButton
        sx={{ ml: "0.75rem" }}
        title="Убрать выделенные сообщения"
        onClick={clearSelectMessage}
      >
        <Close />
      </IconButton>
      <Typography
        color="primary"
        sx={{
          marginLeft: "1rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          flexGrow: 1,
        }}
      >
        {changeDeclination(selectedMessage?.length, "message")}
      </Typography>
      <Stack direction="row" sx={{ mr: "0.75rem" }}>
        {selectedMessage?.length === 1 && (
          <IconButton title="Ответить" onClick={answerMessage}>
            <Reply />
          </IconButton>
        )}
        <IconButton title="Переслать" onClick={forwardMessage}>
          <ReplyAll sx={{ transform: "scale(-1, 1)" }} />
        </IconButton>
        <IconButton color="danger" title="Удалить сообщение">
          <Delete />
        </IconButton>
      </Stack>
    </>
  );
};

export default ToolBar;
