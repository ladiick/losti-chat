import { Avatar, IconButton, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";
import { changeDeclination } from "../../../../../../components/actions/changeDeclination";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { motion } from "framer-motion";

const PossibleFriendsItem = ({ obj, handlerPeople }) => {
  return (
    <ListItem
      component={motion.div}
      initial={{ top: -100, opacity: 0 }}
      animate={{ top: 0, opacity: 1 }}
    >
      <ListItemButton
        sx={{ display: "flex", gap: "4", borderRadius: "sm" }}
        component={Link}
        to={`/?dialogs=${obj.possible_friend.pk}`}
      >
        <Avatar src={obj?.possible_friend?.image} alt={obj?.possible_friend?.image} size="lg" />
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <div>
            <Typography color="primary">
              {obj.possible_friend.first_name} {obj.possible_friend.last_name}
            </Typography>
            <Typography level="body-md">{changeDeclination(obj.count, "posFriend")}</Typography>
          </div>
          <IconButton onClick={handlerPeople} variant="outlined" title="Добавить в друзья">
            <PersonAddIcon />
          </IconButton>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default PossibleFriendsItem;
