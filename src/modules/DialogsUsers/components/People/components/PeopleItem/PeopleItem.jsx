import { reTime } from "../../../../../../components/actions/reTime.js";
import s from "./PeopleItem.module.scss";

import { Avatar, Badge, Chip, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HOST } from "../../../../../../components/api/HOST.js";
import Text from "../../../../../../components/ui/Text/Text";

const PeopleItem = ({ flag, message, time, handlerPeople, obj, index }) => {
  const [searchParams] = useSearchParams();

  const activeItem = searchParams.get("dialogs") === String(obj?.pk);

  if (flag === "forward") {
    return (
      <div className={s.main__wrapper} title={obj.first_name + " " + obj.last_name}>
        <div onClick={handlerPeople} className={s.block__people__item}>
          <div className={s.info__message}>
            <Badge color="success" badgeInset="14%" invisible={!obj.online} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
              <Avatar alt={obj.first_name + obj.last_name} src={`${HOST + obj.image}`} size="lg" />
            </Badge>

            <div className={s.name__lastMessage}>
              <Text weight="strong" pointer>
                {obj.first_name} {obj.last_name}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ListItem className={s.main__wrapper} title={obj.first_name + " " + obj.last_name}>
      <ListItemButton
        to={`/?dialogs=${obj.pk}`}
        component={Link}
        end
        onClick={handlerPeople}
        variant="outlined"
        color="primary"
        sx={(theme) => ({
          borderRadius: theme.radius.sm,
          backgroundColor: activeItem && theme.vars.palette.primary.outlinedHoverBg,
        })}
      >
        <Stack direction="row" alignItems="center" width={"100%"}>
          <Badge color="success" badgeInset="14%" invisible={!obj.online} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Avatar alt={obj.first_name + obj.last_name} src={`${HOST + obj.image}`} size="lg" />
          </Badge>
          <Stack width={"100%"} sx={{ marginLeft: "0.75rem" }} spacing={0.5}>
            <Stack alignItems={"center"} direction={"row"}>
              <Typography component={"h3"} level={"bodyM"} flexGrow={1}>
                {obj.first_name} {obj.last_name}
              </Typography>
              <Typography level={"body-xs"}>{reTime(time)}</Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"}>
              <Typography component={"p"} level={"bodyM"} flexGrow={1}>
                {message}
              </Typography>
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
