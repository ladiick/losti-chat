import { Sheet, Stack } from "@mui/joy";
import React from "react";
const WrapperBlocks = ({ header, children, ...props }) => {
  return (
    <Sheet
      sx={(theme) => ({
        p: "0.75rem",
        backgroundColor: "#e9ebee",
        [theme.getColorSchemeSelector("dark")]: {
          backgroundColor: "rgba(20 20 20 / 1)",
        },
      })}
      {...props}
    >
      {header && (
        <Stack direction="row" alignItems="center" spacing={2} component={"header"}>
          {header}
        </Stack>
      )}
      {children}
    </Sheet>
  );
};

export default WrapperBlocks;
