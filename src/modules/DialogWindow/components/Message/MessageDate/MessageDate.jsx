import { Box, Typography } from "@mui/joy";
import React from "react";
import { reTime } from "../../../../../components/actions/reTime";
const MessageDate = React.memo(({ message }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "sticky",
        top: "0.625rem",
        zIndex: 12,
        userSelect: "none",
        pointerEvents: "none",
        mb: "10px",
      }}
    >
      <Typography
        bgcolor="Background"
        level="body-xs"
        variant="outlined"
        sx={{
          borderRadius: "lg",
          display: "inline-block",
          width: "4rem",
          wordBreak: "break-word",
          position: "relative",
          zIndex: 0,
        }}
      >
        {reTime(message)}
      </Typography>
    </Box>
  );
});

export default MessageDate;
