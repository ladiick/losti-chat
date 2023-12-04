import { Avatar, IconButton, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";
import { changeDeclination } from "../../../../../../components/actions/changeDeclination";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const PossibleFriendsItem = ({ obj, handlerPeople }) => {
  return (
    <ListItem>
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
