import { Stack } from "@mui/joy";

const PanelHeader = ({ before, children, after, sx }) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={{ width: "100%", ...sx }}>
      {before}
      <Stack direction="row" alignItems="center" flexGrow={1}>
        {children}
      </Stack>
      <Stack direction="row" alignItems="center">
        {after}
      </Stack>
    </Stack>
  );
};

export default PanelHeader;
