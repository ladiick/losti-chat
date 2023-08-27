import { Bookmark, Menu as MenuIcon, People } from "@mui/icons-material";
import { Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const HeaderMenu = () => {
  const myId = useSelector((state) => state.user.aboutUser.id);

  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "plain" } }}>
        <MenuIcon />
      </MenuButton>

      <Menu
        variant="plain"
        placement="bottom-start"
        size={"sm"}
        sx={(theme) => ({ width: 246, bgcolor: theme.vars.palette.background.backdrop, backdropFilter: "blur(15px)" })}
      >
        <MenuItem to={`/?dialogs=${myId}`} component={Link}>
          <ListItemDecorator>
            <Bookmark />
          </ListItemDecorator>
          Избранное
        </MenuItem>
        <MenuItem to={`/friends`} component={Link}>
          <ListItemDecorator>
            <People />
          </ListItemDecorator>
          Друзья
        </MenuItem>

        <Typography sx={{ pt: "0.75rem", userSelect: "none" }} textAlign={"center"} level={"body-xs"}>
          Losti-Chat Web
        </Typography>
      </Menu>
    </Dropdown>
  );
};

export default HeaderMenu;
