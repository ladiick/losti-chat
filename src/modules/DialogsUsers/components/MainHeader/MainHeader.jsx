import { Stack } from "@mui/joy";
import Menu from "../Menu/Menu";
const MainHeader = ({ children }) => {
  return (
    <Stack
      component={"header"}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        p: "0.75rem",
        height: "3.5rem",
        boxShadow: "sm",
      }}
    >
      <Menu />
      {children}
    </Stack>
  );
};

export default MainHeader;
