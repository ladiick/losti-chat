import { Box, Stack, Typography } from "@mui/joy";
import React from "react";

const MessageAnswer = ({ answer, obj }) => {
  return (
    <Box
      sx={{
        transition: "all .3s",
        position: "relative",
        mb: "0.25rem",
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: "0.3125rem",
          bottom: "0.3125rem",
          width: "2px",
          bgcolor: "white",
          borderRadius: "8px",
        },
      }}
    >
      <Stack direction="column" sx={{ ml: "0.5rem" }}>
        <Typography color="primary" level="body-sm">
          {obj.first_name} {obj.last_name}
        </Typography>
        <Typography sx={{ color: "white" }}>{answer.message}</Typography>
      </Stack>
    </Box>
  );
};

export default MessageAnswer;
