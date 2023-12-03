import { ArrowBack, Bookmark, HelpOutline, Menu, People, Settings } from "@mui/icons-material";
import { Box, IconButton, ListItemDecorator, Sheet, Typography, useTheme } from "@mui/joy";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { showFriendsPage } from "../../../../redux/slices/pages";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { pageSelector, showFriendsPage } from "../../../../redux/slices/pages";

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

const HeaderMenu = ({ children }) => {
  const myId = useSelector((state) => state.user.aboutUser.id);
  const { friends } = useSelector((state) => pageSelector(state));
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const theme = useTheme();

  const openFriends = () => {
    setDropdown((pre) => !pre);
    dispatch(showFriendsPage(true));
    window.history.pushState({}, null, null);
  };

  const closeFriendPage = () => {
    dispatch(showFriendsPage(false));
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        variant="outlined"
        onClick={() => {
          friends && closeFriendPage();
          !friends && setDropdown((pre) => !pre);
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          component={motion.div}
          initial={toggleIconClosed}
          animate={friends ? toggleIconOpen : toggleIconClosed}
        >
          {friends ? <ArrowBack /> : <Menu />}
        </Box>
      </IconButton>
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

        <Typography sx={{ pt: "0.75rem", userSelect: "none" }} textAlign="center" level="body-xs">
          Losti-Chat Web
        </Typography>
      </Sheet>
    </Box>
  );
};

const MenuItem = ({ children, ...props }) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      gap: "16px",
      alignItems: "center",
      padding: "8px 16px",
      cursor: "pointer",
      transition: "all .3s",
      "&:hover": { background: "rgba(0,0,0,0.4)" },
    }}
  >
    {children}
  </Box>
);

export default HeaderMenu;
