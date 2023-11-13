import { ListItem, ListItemButton, ListItemDecorator, Typography } from "@mui/joy";

const MenuItem = ({ onClick, children, icon }) => {
  return (
    <ListItem onClick={onClick}>
      <ListItemButton sx={{ borderRadius: "sm", wordWrap: "break-word" }}>
        <ListItemDecorator>{icon}</ListItemDecorator>
        <Typography>{children}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
