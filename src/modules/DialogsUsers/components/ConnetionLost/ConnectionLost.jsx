import { Warning } from "@mui/icons-material";
import { LinearProgress, Stack, Typography } from "@mui/joy";

const ConnectionLost = () => {
  return (
    <Stack width={"100%"}>
      <Typography level="body-lg" color="danger" endDecorator={<Warning />} alignSelf={"center"}>
        Lost connection
      </Typography>
      <LinearProgress color="danger" size="md" />
    </Stack>
  );
};

export default ConnectionLost;
