import { Bookmark, HelpOutline, People, Settings } from "@mui/icons-material";
import { Dropdown, ListItemDecorator, Menu, MenuItem, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showFriendsPage } from "../../../../redux/slices/pages";

const HeaderMenu = ({ children }) => {
  const myId = useSelector((state) => state.user.aboutUser.id);
  const dispatch = useDispatch();

  const openFriends = () => {
    setTimeout(() => {
      dispatch(showFriendsPage(true));
    }, 0);
    window.history.pushState({}, null, null);
  };

  return (
    <Dropdown variant="outlined">
      {children}
      <Menu variant="soft" color="primary" placement="bottom-start">
        <MenuItem to={`/?dialogs=${myId}`} component={Link}>
          <ListItemDecorator>
            <Bookmark />
          </ListItemDecorator>
          Избранное
        </MenuItem>
        <MenuItem onClick={openFriends}>
          <ListItemDecorator>
            <People />
          </ListItemDecorator>
          Друзья
        </MenuItem>
        <MenuItem to={`/settings`} component={Link}>
          <ListItemDecorator>
            <Settings />
          </ListItemDecorator>
          Настройки
        </MenuItem>
        <MenuItem to={`#`} component={Link}>
          <ListItemDecorator>
            <HelpOutline />
          </ListItemDecorator>
          Возможности Losti-Chat
        </MenuItem>

        <Typography
          sx={{ pt: "0.75rem", userSelect: "none" }}
          textAlign={"center"}
          level={"body-xs"}
        >
          Losti-Chat Web
        </Typography>
      </Menu>
    </Dropdown>
  );
};

export default HeaderMenu;
