import { Sheet, Stack } from "@mui/joy";
import React from "react";
const WrapperBlocks = ({ header, children, componentHeader, ...props }) => {
  return (
    <Sheet {...props}>
      {header && (
        <Stack direction="row" alignItems="center" spacing={2} component={componentHeader}>
          {header}
        </Stack>
      )}
      {children}
    </Sheet>
  );
};

export default WrapperBlocks;
