import { PersonAdd } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { Link } from "react-router-dom";

const AllPeopleItem = ({ obj, handlerPeople }) => {
  return (
    <ListItem>
      <ListItemButton
        sx={{ display: "flex", gap: "4", borderRadius: "sm" }}
        component={Link}
        to={`/?dialogs=${obj?.possible_friend?.pk}`}
      >
        <Avatar src={obj?.image} alt={obj?.first_name + " " + obj?.last_name} size="lg" />
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Typography color="primary">
            {obj?.first_name} {obj?.last_name}
          </Typography>

          <IconButton onClick={handlerPeople} variant="outlined" title="Добавить в друзья">
            <PersonAdd />
          </IconButton>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default AllPeopleItem;
