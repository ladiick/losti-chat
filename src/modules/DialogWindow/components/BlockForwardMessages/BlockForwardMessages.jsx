import React from "react";
import s from "./BlockForwardMessages.module.scss";
import Text from "../../../../components/ui/Text/Text";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearForwardMessage } from "../../../../redux/slices/messageSlice";
import { openModalBlock } from "../../../../redux/slices/navigationSlice";
import { changeDeclination } from "../../../../components/actions/changeDeclination";
import CloseButton from "../../../../components/ui/CloseButton/CloseButton";
import { Box, Stack, Typography } from '@mui/joy'

const BlockForwardMessages = ({ message }) => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const closeForward = () => {
    dispatch(clearForwardMessage({ param: searchParams.get("dialogs") }));
  };

  const viewForwardedMessage = () => {
    dispatch(openModalBlock({ viewForwardMessage: true }));
  };

  if (message?.length > 1) {
    return (
      <>
        <div className={s.wrapper__forward__msg}>
          <div className={s.forward__content}>
            <Text className={s.name__time} weight="strong">
              Пересланные сообщения
            </Text>
            <Text className={s.message__forward} onClick={viewForwardedMessage}>
              {changeDeclination(message?.length, "message")}
            </Text>
          </div>
          <CloseButton className={s.close__btn} onClick={() => closeForward()} />
        </div>
      </>
    );
  }

  return (
    <Box>
      <Stack>
        <Typography color="primary">
          {message?.[0]?.sender?.first_name + " " + message?.[0]?.sender?.last_name}
        </Typography>

        {message?.[0]?.message ? (
          <Text className={s.message__forward} onClick={viewForwardedMessage}>
            {message?.[0]?.message}
          </Text>
        ) : (
          <Text className={s.message__forward} onClick={viewForwardedMessage}>
            {changeDeclination(message?.length, "message")}
          </Text>
        )}
      </Stack>
      <CloseButton className={s.close__btn} onClick={() => closeForward()} />
    </Box>
  );
};

export default BlockForwardMessages;
