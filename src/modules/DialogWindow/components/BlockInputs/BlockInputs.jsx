import React, { useCallback, useContext, useEffect, useRef } from "react";
import s from "./BlockInputs.module.scss";
import { AiOutlinePaperClip } from "react-icons/ai";
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion";
import { BsSend, BsSendSlash } from "react-icons/bs";
import sanitizeHtml from "sanitize-html";
import { useLocation, useSearchParams } from "react-router-dom";
import BlockForwardMessages from "../BlockForwardMessages/BlockForwardMessages";
import { useDispatch, useSelector } from "react-redux";
import BlockAnswerMessage from "../BlockAnswerMessage/BlockAnswerMessage";
import _ from "underscore";
import BlockFilesMessage from "../BlockFilesMessage/BlockFilesMessage";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import { MyContext } from "../../../Layout/Layout";
import { sendMessagesOnChat } from "../../../../redux/slices/messageSlice";

const BlockInputs = () => {
  const { isMobile } = useMatchMedia();
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

  const onContentChange = useCallback((evt) => {
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
  }, []);
  //searchParams.get('dialogs')
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
    <div className={s.wrapper__input}>
      {answerMessages && Object.keys(answerMessages)?.length !== 0 && <BlockAnswerMessage message={answerMessages} />}
      <div className={s.input}>
        <div className={s.form__wrapper}>
          <label className={s.download__file}>
            <AiOutlinePaperClip />
            <input type="file" className={s.input__file} multiple={true} onChange={handlerFilesUploader} />
          </label>

          <div className={s.block__input__message}>
            <ContentEditable
              html={content}
              ref={refContentEditable}
              onKeyDown={handlerKeyDown}
              contentEditable={true}
              className={s.input__message}
              role="textbox"
              onChange={onContentChange}
            />
            {content === "" && (
              <motion.span
                initial={{
                  x: 20,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                className={s.placeholder}
              >
                Напишите сообщение...
              </motion.span>
            )}
          </div>

          <div ref={refSend} onClick={() => sendMessage()} className={s.button__send}>
            {statusSocket === "ready" ? <BsSend /> : <BsSendSlash />}
          </div>
        </div>
      </div>

      {forwardMessages && forwardMessages.length !== 0 && <BlockForwardMessages message={forwardMessages} />}

      {imagesMessages?.length !== 0 && <BlockFilesMessage files={imagesMessages} />}
    </div>
  );
};

export default BlockInputs;
