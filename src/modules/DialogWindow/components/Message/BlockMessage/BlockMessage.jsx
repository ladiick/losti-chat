import { Box, useTheme } from "@mui/joy";
import React from "react";
import { convertTime } from "../../../../../components/actions/convertTime";

const BlockMessage = ({
  children,
  activeMessage,
  time,
  pos,
  sx,
  wrapperStyles,
  timeStyles,
  ...props
}) => {
  const theme = useTheme();
  const scheme = localStorage.getItem("joy-mode");

  return (
    <Box
      sx={{
        position: "relative",
        mb: "0.5rem",
        textAlign: pos === "right" ? "right" : "left",
        "&:before": {
          content: '""',
          cursor: "pointer",
          position: "absolute",
          top: "-0.2rem",
          bottom: "-0.2rem",
          left: "-50vw",
          right: "-50vw",
          background: "#000",
          zIndex: "0",
          opacity: activeMessage ? "0.6" : "0",
          transition: "all 0.3s",
        },
        ...sx,
      }}
      {...props}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          userSelect: "text",
          p: ".3125rem .5rem .375rem",
          whiteSpace: "pre-line",
          display: "inline-block",
          maxWidth: "80%",
          wordBreak: "break-word",
          wordWrap: "break-word",
          position: "relative",
          borderRadius: pos === "left" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
          textAlign: "justify",
          bgcolor: scheme === "dark" ? theme.vars.palette.neutral.outlinedHoverBg : "#4E73F814",
          "@media(max-width: 768px)": {
            maxWidth: "98%",
          },
          ...wrapperStyles,
        }}
      >
        {children}
        <Box
          sx={{
            cursor: "pointer",
            userSelect: "none",
            whiteSpace: "nowrap",
            wordBreak: "normal",
            fontSize: ".75rem",
            fontWeight: "600",
            color: `rgba(${theme.vars.palette.neutral.lightChannel} / 0.6)`,
            display: "flex",
            position: "relative",
            top: "7px",
            bottom: "auto",
            float: "right",
            marginLeft: "0.4375rem",
            ...timeStyles,
          }}
        >
          {convertTime(time)}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(BlockMessage);
