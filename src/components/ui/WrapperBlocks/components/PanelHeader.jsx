import { ArrowBack } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/joy";

const PanelHeader = ({ title, Icons }) => {
  return (
    <>
      <IconButton>
        <ArrowBack />
      </IconButton>
      <Stack direction="row" alignItems="center" sx={{width:'100%'}}>
        <Typography flexGrow={1}>{title}</Typography>
        <Stack direction="row" alignItems="center">
          {Icons}
        </Stack>
      </Stack>
    </>
  );
};

export default PanelHeader;
