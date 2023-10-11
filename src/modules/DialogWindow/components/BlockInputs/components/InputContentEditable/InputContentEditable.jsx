import { Box } from "@mui/joy";
import { memo, useCallback, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import CustomScroll from "../../../../../../components/ui/CustomScroll/CustomScroll";
import { sendMessagesOnChat } from "../../../../../../redux/slices/messageSlice";
import PlaceholderInput from "./PlaceholderInput";

const InputContentEditable = ({ sendMessage }) => {
  const dispatch = useDispatch();
  const refContentEditable = useRef("");
  const [searchParams] = useSearchParams();
  const content = useSelector((state) => state.message.sendMessageOnChat?.[searchParams.get("dialogs")]?.sendMessage || "");

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
    [dispatch, searchParams],
  );

  const handleDownEnterKey = (e) => {
    if (!e.shiftKey && e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const downRandomKey = ({ key }) => {
      if (/^[a-zа-яё0-9]$/i.test(key)) {
        refContentEditable?.current?.el?.current?.focus();
      }
    };
    refContentEditable?.current?.el?.current?.focus();
    window.addEventListener("keydown", downRandomKey);
    return () => window.removeEventListener("keydown", downRandomKey);
  }, []);

  return (
    <Box
      position="relative"
      sx={{
        flexGrow: 1,
        py: "1rem",
      }}
    >
      <Box
        component={ContentEditable}
        html={content}
        ref={refContentEditable}
        contentEditable={true}
        role="textbox"
        onChange={onContentChange}
        onKeyDown={handleDownEnterKey}
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
          pr: "0.25rem",
          ...CustomScroll,
        }}
      />
      {content === "" && <PlaceholderInput />}
    </Box>
  );
};

export default memo(InputContentEditable);
