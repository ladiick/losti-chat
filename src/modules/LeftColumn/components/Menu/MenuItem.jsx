import { ListItem, ListItemButton, ListItemDecorator, Typography } from "@mui/joy";

const MenuItem = ({ onClick, children, icon, ...props }) => {
  return (
    <ListItem onClick={onClick} {...props}>
      <ListItemButton sx={{ borderRadius: "sm", wordWrap: "break-word" }}>
        <ListItemDecorator>{icon}</ListItemDecorator>
        <Typography level="title-sm">{children}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
