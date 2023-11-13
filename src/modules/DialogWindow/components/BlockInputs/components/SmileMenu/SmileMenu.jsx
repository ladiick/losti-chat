import { SentimentSatisfied } from "@mui/icons-material";
import { Box, useTheme } from "@mui/joy";

const SmileMenu = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "3.5rem",
        height: "3.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: { width: "2.875rem", height: "2.875rem" },
      }}
    >
      <SentimentSatisfied />
    </Box>
  );
};

export default SmileMenu;
