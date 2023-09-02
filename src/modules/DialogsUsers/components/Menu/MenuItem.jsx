import { ListItem, ListItemButton, ListItemDecorator, Typography } from "@mui/joy";

const MenuItem = ({ to, component, children, icon }) => {
  return (
    <ListItem to={to} component={component}>
      <ListItemButton sx={{ borderRadius: "sm", wordWrap: "break-word" }}>
        <ListItemDecorator>{icon}</ListItemDecorator>
        <Typography>{children}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
