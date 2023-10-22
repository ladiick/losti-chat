import { ErrorOutline, OpenInNew } from "@mui/icons-material";
import { Box, IconButton, Sheet, Typography } from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Sheet
      color="neutral"
      sx={{ height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box textAlign="center">
        <ErrorOutline color="warning" sx={{ width: "20rem", height: "20rem" }} />
        <Typography
          color="warning"
          level="h1"
          endDecorator={
            <IconButton color="primary" size="lg" variant="solid" component={Link} to="/">
              <OpenInNew />
            </IconButton>
          }
        >
          Страница не найдена
        </Typography>
      </Box>
    </Sheet>
  );
};

export default NotFound;
