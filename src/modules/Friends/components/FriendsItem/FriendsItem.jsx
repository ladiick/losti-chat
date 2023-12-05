import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../../../redux/slices/navigationSlice";
import BtnRequestsFriend from "./components/BtnRequestsFriend/BtnRequestsFriend";

import { Message, PersonRemove } from "@mui/icons-material";
import { Avatar, Box, IconButton, ListItem, ListItemButton, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const toggleIconClosed = {
  rotate: 360,
  scale: 1,
  transition: {
    duration: 0.2,
  },
};

const toggleIconOpen = {
  rotate: 0,
  scale: 1,
  transition: {
    duration: 0.2,
  },
};

const FriendsItem = ({ obj, requests, handlerCancel, handlerAccept }) => {
  const dispatch = useDispatch();
  const [visibleIcon, setVisibleIcon] = useState();

  const visibleIconHover = () => {
    setVisibleIcon((pre) => !pre);
  };

  const deleteFriendFunc = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteFriend({ flag: true, obj: obj.friend }));
  };

  return (
    <ListItem
      component={motion.div}
      initial={{ left: -100, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
    >
      <ListItemButton
        sx={{ display: "flex", gap: "4", borderRadius: "sm" }}
        component={Link}
        to={`/?dialogs=${obj.friend.pk}`}
      >
        <Avatar src={obj?.friend?.image} alt={obj?.friend?.image} size="lg" />
        <Typography
          color="primary"
          width="100%"
          endDecorator={
            <IconButton
              onClick={deleteFriendFunc}
              component={motion.button}
              onHoverStart={visibleIconHover}
              onHoverEnd={visibleIconHover}
              variant={visibleIcon ? "outlined" : "plain"}
              title={visibleIcon ? "Удалить из друзей" : "Написать сообщение"}
              color={visibleIcon ? "danger" : "neutral"}
              sx={{
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                component={motion.div}
                initial={false}
                animate={visibleIcon ? toggleIconOpen : toggleIconClosed}
              >
                {visibleIcon ? <PersonRemove /> : <Message />}
              </Box>
            </IconButton>
          }
          sx={{
            "& span": {
              margin: "0 0 0 auto",
            },
          }}
        >
          {obj.friend.first_name} {obj.friend.last_name}
        </Typography>

        {requests === "requests" && (
          <BtnRequestsFriend handlerCancel={handlerCancel} handlerAccept={handlerAccept} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default FriendsItem;
