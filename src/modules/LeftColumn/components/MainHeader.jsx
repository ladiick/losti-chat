import { ArrowBack, Menu as MenuIcon, Search } from "@mui/icons-material";
import { CircularProgress, IconButton, Input, MenuButton, Stack } from "@mui/joy";
import { keyframes } from "@mui/system";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../../Pages/Layout/Layout";
import { pageSelector, showFriendsPage } from "../../../redux/slices/pages";
import Menu from "./Menu/Menu";

const menuButton = keyframes`
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(0);
  }
`;
const arrowBack = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
`;

const MainHeader = ({ searchValue, setSearchValue }) => {
  const { statusSocket } = useContext(MyContext);
  const { friends } = useSelector((state) => pageSelector(state));
  const dispatch = useDispatch();

  const closeFriendPage = () => {
    dispatch(showFriendsPage(false));
    setTimeout(() => dispatch(showFriendsPage(null)), 200);
  };

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
      <Menu>
        {friends ? (
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            onClick={closeFriendPage}
            sx={{ animation: `${arrowBack} 300ms forwards` }}
          >
            <ArrowBack />
          </MenuButton>
        ) : (
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
            sx={friends === false && { animation: `${menuButton} 300ms forwards` }}
          >
            <MenuIcon />
          </MenuButton>
        )}
      </Menu>
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
