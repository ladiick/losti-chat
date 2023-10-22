import { Box } from "@mui/joy";
import { memo, useCallback, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import UseMatchMedia from "../../../../../../components/hooks/useMatchMedia";
import CustomScroll from "../../../../../../components/ui/CustomScroll/CustomScroll";
import { onChangeTextDialog, textMessage } from "../../../../../../redux/slices/messageSlice";
import PlaceholderInput from "./PlaceholderInput";

const InputContentEditable = ({ sendMessage, setSendEnter, sendDownEnter }) => {
  const dispatch = useDispatch();
  const refContentEditable = useRef("");
  const [searchParams] = useSearchParams();
  const param = searchParams.get("dialogs");
  const content = useSelector((state) => textMessage(state, param));
  const { isMobile } = UseMatchMedia();
  const onContentChange = useCallback(
    (evt) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
        allowedAttributes: { a: ["href"] },
      };
      if (evt.currentTarget.innerHTML.length > 20000) {
        dispatch(
          onChangeTextDialog({
            id: param,
            text: "",
          }),
        );
      }
      dispatch(
        onChangeTextDialog({
          id: param,
          text: sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf),
        }),
      );
    },
    [dispatch, param],
  );

  const handleDownEnterKey = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey && !isMobile) {
        e.preventDefault();
        setSendEnter(true);
      }
    },
    [isMobile, setSendEnter],
  );

  useEffect(() => {
    const downRandomKey = (e) => {
      if (/^[a-zа-яё0-9]$/i.test(e.key)) {
        refContentEditable.current?.el?.current?.focus();
      }
    };
    refContentEditable.current?.el?.current?.focus();
    window.addEventListener("keydown", downRandomKey);
    return () => window.removeEventListener("keydown", downRandomKey);
  }, [content]);

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
