import { useTheme } from "@mui/joy";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import DialogWindow from "../DialogWindow/DialogWindow";

const MiddleColumn = () => {
  const theme = useTheme();
  return (
    <WrapperBlocks
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.vars.palette.background.body,
      }}
    >
      <DialogWindow />
    </WrapperBlocks>
  );
};

export default MiddleColumn;
