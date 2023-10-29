import { Reply } from "@mui/icons-material";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/joy";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setForwardMessageIfMany } from "../../../../../redux/slices/messageSlice";
import { openModalBlock } from "../../../../../redux/slices/navigationSlice";
import { helperMessage } from "../../../../../utils/utils";
const MessageForward = ({ forward, count, view }) => {
  const dispatch = useDispatch();

  const forwardOutput = (forward) => {
    if (Array.isArray(forward)) {
      return forward;
    } else {
      return forward?.forward;
    }
  };

  const openManyForward = (e, obj) => {
    e.stopPropagation();
    dispatch(setForwardMessageIfMany(obj));
    dispatch(openModalBlock({ viewForwardMessage: true }));
  };

  return (
    <Box>
      {count === 0 && (
        <Typography
          sx={{ color: "white" }}
          level="body-sm"
          startDecorator={<Reply sx={{ transform: "scale(-1, 1)", color: "white" }} />}
        >
          Переслано
        </Typography>
      )}
      {forwardOutput(forward)
        ?.map((obj, index, arr) => (
          <Box
            key={obj?.id}
            sx={{
              mt: "0.25rem",
              pl: "0.5rem",
              position: "relative",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "2px",
                bgcolor: count === 0 ? "white" : "divider",
                borderRadius: "8px",
              },
            }}
          >
            <Stack direction="row" alignItems="center">
              {helperMessage(arr?.[index], arr?.[index - 1]) ? (
                ""
              ) : (
                <MuiLink component={Link} to={`/profile/${obj?.sender?.pk}`}>
                  {obj?.sender?.first_name}
                </MuiLink>
              )}
            </Stack>
            {obj?.message && <Typography sx={{ color: "white" }}>{obj?.message}</Typography>}

            {view ? (
              <MessageForward forward={obj} view={true} />
            ) : obj?.forward?.length !== 0 && count < 3 ? (
              <MessageForward forward={obj} count={count + 1} />
            ) : obj?.forward?.length !== 0 ? (
              <MuiLink component="button" color="primary" onClick={(e) => openManyForward(e, obj)}>
                Пересланное сообщение
              </MuiLink>
            ) : (
              ""
            )}
          </Box>
        ))
        .reverse()}
    </Box>
  );
};

export default React.memo(MessageForward);
