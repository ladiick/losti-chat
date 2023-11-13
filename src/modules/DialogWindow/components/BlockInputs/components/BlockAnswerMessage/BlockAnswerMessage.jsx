import { Close, Reply } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearAnswerMessage } from "../../../../../../redux/slices/messageSlice";
const BlockAnswerMessage = ({ message }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const closeForward = () => {
    dispatch(clearAnswerMessage({ param: searchParams.get("dialogs") }));
  };

  return (
    <Box
      sx={{
        transition: "all .3s",
        pr: "0.625rem",
        pt: "0.1875rem",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Reply
          color="primary"
          sx={{
            flexShrink: 0,
            margin: "0 -0.0625rem 0 0",
            padding: "0",
            display: "grid",
            width: "3.5rem",
            placeContent: "center",
          }}
        />
        <Stack flexGrow="1">
          <Typography color="primary">
            {message?.sender?.first_name + " " + message?.sender?.last_name}
          </Typography>
          <Typography sx={{ maxWidth: "20rem" }} noWrap>
            {message?.message}
          </Typography>
        </Stack>

        <IconButton onClick={() => closeForward()}>
          <Close />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default BlockAnswerMessage;
