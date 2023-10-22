import { reTime } from "../../../../../../components/actions/reTime.js";

import { Bookmark, Reply } from "@mui/icons-material";
import { Avatar, Badge, Box, Chip, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { HOST } from "../../../../../../components/api/HOST.js";

const PeopleItem = ({ flag, message, handlerPeople, time, obj }) => {
  const [searchParams] = useSearchParams();
  const myId = useSelector((state) => state.user.aboutUser.id);
  const activeItem = searchParams.get("dialogs") === String(obj?.pk);
  if (flag === "forward") {
    return (
      <ListItem title={obj.first_name + " " + obj.last_name}>
        <ListItemButton onClick={handlerPeople} sx={{ borderRadius: "sm" }}>
          <Stack direction="row" alignItems="center" width="100%" gap="0.5rem">
            {myId === obj.id ? (
              <Avatar size="lg" color="primary" variant="solid">
                <Bookmark />
              </Avatar>
            ) : (
              <Badge
                color="success"
                badgeInset="14%"
                invisible={!obj.online}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Avatar
                  alt={obj.first_name + obj.last_name}
                  src={`${HOST + obj.image}`}
                  size="lg"
                />
              </Badge>
            )}
            <Typography>
              {obj.first_name} {obj.last_name}
            </Typography>
          </Stack>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem title={obj.first_name + " " + obj.last_name} variant="plain">
      <ListItemButton
        selected={activeItem}
        to={`/?dialogs=${obj.pk}`}
        component={Link}
        onClick={handlerPeople}
        color="neutral"
        sx={{ borderRadius: "sm" }}
      >
        <Stack direction="row" alignItems="center" width={"100%"}>
          <Badge
            color="success"
            badgeInset="14%"
            invisible={!obj.online}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar alt={obj.first_name + obj.last_name} src={`${HOST + obj.image}`} size="lg" />
          </Badge>
          <Stack width={"100%"} sx={{ marginLeft: "0.75rem" }} spacing={0.5}>
            <Stack alignItems={"center"} direction={"row"}>
              <Typography
                component={"h3"}
                level="bodyM"
                sx={{ justifyContent: "flex-start" }}
                noWrap
              >
                {obj.first_name} {obj.last_name}
              </Typography>
              <Box flexGrow={1} />
              <Typography level={"body-xs"} flexShrink={0}>
                {reTime(time)}
              </Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"}>
              <Typography
                component={"p"}
                level={"bodyM"}
                flexGrow={1}
                noWrap
                textAlign="left"
                startDecorator={
                  message?.forward.length ? <Reply sx={{ transform: "scale(-1, 1)" }} /> : null
                }
                sx={{
                  pr: "0.25rem",
                  unicodeBidi: "plaintext",
                  maxWidth: "10rem",
                }}
              >
                {myId === obj?.pk ? `Вы: ${message?.message}` : message?.message}
                {message?.forward.length && !message?.message
                  ? message?.forward?.[0].message
                  : null}
              </Typography>
              <Box flexGrow={1} />
              <Chip color="primary" size="sm" variant="solid">
                2
              </Chip>
            </Stack>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default React.memo(PeopleItem);
