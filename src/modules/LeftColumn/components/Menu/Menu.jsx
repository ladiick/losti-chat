import { ArrowBack, Bookmark, HelpOutline, Menu, People, Settings } from "@mui/icons-material";
import { Box, IconButton, List, Sheet, Typography, useTheme } from "@mui/joy";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showFriendsPage } from "../../../../redux/slices/pages";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  closePages,
  pageSelector,
  showFriendsPage,
  showSettingsPage,
} from "../../../../redux/slices/pages";
import MenuItem from "./MenuItem";

const toggleIconClosed = {
  rotate: 180,
  transition: {
    duration: 0.2,
  },
};

const toggleIconOpen = {
  rotate: 0,
  transition: {
    duration: 0.2,
  },
};

const HeaderMenu = () => {
  const myId = useSelector((state) => state.user.aboutUser.id);
  const { friends, settings } = useSelector((state) => pageSelector(state));
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const theme = useTheme();

  const openFriends = () => {
    setDropdown((pre) => !pre);
    dispatch(showFriendsPage(true));
    window.history.pushState({}, null, null);
  };

  const openSettings = () => {
    setDropdown((pre) => !pre);
    dispatch(showSettingsPage(true));
    window.history.pushState({}, null, null);
  };

  const togglePage = () => {
    if (friends || settings) {
      setDropdown(false);
      dispatch(closePages());
    } else {
      setDropdown(true);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton variant="outlined" onClick={togglePage}>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          component={motion.div}
          initial={false}
          animate={friends || settings ? toggleIconOpen : toggleIconClosed}
        >
          {friends || settings ? <ArrowBack /> : <Menu />}
        </Box>
      </IconButton>
      {dropdown && (
        <Box sx={{ position: "fixed", inset: 0, zIndex: 30 }} onClick={() => setDropdown(false)} />
      )}
      <Sheet
        color="neutral"
        sx={{
          width: "264px",
          position: "absolute",
          zIndex: 100,
          overflow: "hidden",
          border: "1px solid",
          borderColor: theme.palette.neutral.outlinedBorder,
          borderRadius: "sm",
        }}
        component={motion.div}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          dropdown
            ? {
                scale: 1,
                opacity: 1,
                left: "0",
                top: "40px",
              }
            : {
                scale: 0,
                opacity: 0,
                left: "-50%",
                top: "-50%",
              }
        }
        transition={{ type: "Tween", duration: "0.25" }}
      >
        <List sx={{ p: "0.5rem" }}>
          <MenuItem to={`/?dialogs=${myId}`} component={Link} icon={<Bookmark />}>
            Избранное
          </MenuItem>
          <MenuItem onClick={openFriends} icon={<People />}>
            Друзья
          </MenuItem>
          <MenuItem onClick={openSettings} icon={<Settings />}>
            Настройки
          </MenuItem>
          <MenuItem to={`#`} component={Link} icon={<HelpOutline />}>
            Возможности Losti-Chat
          </MenuItem>
        </List>
        <Typography sx={{ pt: "0.75rem", userSelect: "none" }} textAlign="center" level="body-xs">
          Losti-Chat Web
        </Typography>
      </Sheet>
    </Box>
  );
};

export default HeaderMenu;
