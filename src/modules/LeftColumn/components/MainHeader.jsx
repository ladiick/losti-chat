import { Search } from "@mui/icons-material";
import { CircularProgress, Input, Stack } from "@mui/joy";
import { useContext } from "react";
import { MyContext } from "../../../Pages/Layout/Layout";
import Menu from "./Menu/Menu";
import { LeftColumnContext } from "../LeftColumn";

const MainHeader = () => {
  const { statusSocket } = useContext(MyContext);
  const { searchValue, setSearchValue } = useContext(LeftColumnContext);

  return (
    <Stack
      component="header"
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
      <Input
        fullWidth
        endDecorator={
          statusSocket === "pending" ? (
            <CircularProgress color="danger" value={50} size="sm" variant="plain" />
          ) : (
            <Search />
          )
        }
        type="text"
        placeholder={statusSocket === "pending" ? "Соединение..." : "Поиск"}
        value={searchValue}
        maxLength="30"
        onChange={({ target: { value } }) => setSearchValue(value)}
        sx={{ boxShadow: "xs" }}
      />
    </Stack>
  );
};

export default MainHeader;
