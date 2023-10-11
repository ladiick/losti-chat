import { Close, Delete, Redo, Reply, ReplyAll } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { changeDeclination } from "../../../../../../components/actions/changeDeclination";
import { clearAnswerMessage, clearForwardMessage, clearMessage, sendMessagesOnChat } from '../../../../../../redux/slices/messageSlice'
import { forwardMessageFlag } from '../../../../../../redux/slices/navigationSlice'

const ToolBar = () => {
  const { currentMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
	const param = searchParams.get("dialogs");

	const answerMessage = () => {
    dispatch(
      sendMessagesOnChat({
        param,
        answerMessage: currentMessage[searchParams?.get("dialogs")][0],
      }),
    );
    dispatch(clearMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
	};

	 const forwardMessage = () => {
     dispatch(forwardMessageFlag(true));
     dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
   };

	const clearSelectMessage = () => {
    dispatch(clearMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
	};

  return (
    <>
      <IconButton sx={{ ml: "0.75rem" }} title="Убрать выделенные сообщения" onClick={clearSelectMessage}>
        <Close />
      </IconButton>
      <Typography color='primary' sx={{ marginLeft: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flexGrow: 1 }}>
        {changeDeclination(currentMessage?.[param]?.length, "message")}
      </Typography>
      <Stack direction="row" sx={{ mr: "0.75rem" }}>
        {currentMessage?.[param]?.length === 1 && <IconButton title="Ответить" onClick={answerMessage}>
          <Reply />
        </IconButton>}
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
