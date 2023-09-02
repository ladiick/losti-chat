import { Bookmark, DarkMode, HelpOutline, LightMode, Menu, People, Settings } from "@mui/icons-material";
import { Avatar, IconButton, List, Modal, Sheet, Stack, Typography, modalClasses, useColorScheme } from "@mui/joy";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
const HeaderMenu = () => {
  const myId = useSelector((state) => state.user.aboutUser.id);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { mode, setMode } = useColorScheme();
  return (
    <>
      <IconButton onClick={() => setIsOpenMenu((open) => !open)}>
        <Menu />
      </IconButton>
      <Modal
        open={isOpenMenu}
        onClose={() => setIsOpenMenu((open) => !open)}
        keepMounted
        sx={{
          transitionProperty: "visibility",
          transitionDelay: isOpenMenu ? "0s" : "300ms",
          [`& .${modalClasses.backdrop}`]: {
            opacity: isOpenMenu ? 1 : 0,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        <Sheet
          sx={{
            px: 2,
            py: "0.75rem",
            boxSizing: "border-box",
            position: "fixed",
            overflow: "auto",
            width: "clamp(356px, 30vw, 400px)",
            height: "100%",
            left: 0,
            transform: isOpenMenu ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
          }}
        >
          <Sheet component={"header"} sx={{ borderBottom: "1px solid", borderColor: "divider", pb: "0.75rem" }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Avatar size="lg" />
              <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>{mode === "dark" ? <LightMode /> : <DarkMode />}</IconButton>
            </Stack>
            <Typography component={"h3"} level={"h4"} mt={1}>
              ladick
            </Typography>
          </Sheet>
          <List onClick={() => setIsOpenMenu((open) => !open)}>
            <MenuItem to={`/?dialogs=${myId}`} component={Link} icon={<Bookmark />}>
              Избранное
            </MenuItem>
            <MenuItem to={`/friends`} component={Link} icon={<People />}>
              Друзья
            </MenuItem>
            <MenuItem to={`/settings`} component={Link} icon={<Settings />}>
              Настройки
            </MenuItem>
            <MenuItem to={`#`} component={Link} icon={<HelpOutline />}>
              Возможности Losti-Chat
            </MenuItem>
          </List>

          <Typography sx={{ pt: "0.75rem", userSelect: "none" }} textAlign={"center"} level={"body-xs"}>
            Losti-Chat Web
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
};

export default HeaderMenu;
