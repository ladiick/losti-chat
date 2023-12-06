import { Edit, MoreVert, Search } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Input, Stack, Typography } from "@mui/joy";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { MyContext } from "../../../Pages/Layout/Layout";
import { pageSelector } from "../../../redux/slices/pages";
import { LeftColumnContext } from "../LeftColumn";
import Menu from "./Menu/Menu";

const MainHeader = () => {
  const { statusSocket } = useContext(MyContext);
  const { searchValue, setSearchValue } = useContext(LeftColumnContext);
  const { settings } = useSelector((state) => pageSelector(state));

  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        p: "0.75rem",
        height: "3.5rem",
        boxShadow: "sm",
      }}
    >
      <Menu />
      <AnimatePresence initial={false}>
        {settings ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            component={motion.div}
            initial={{ scale: 0 }}
            animate={settings ? { scale: 1 } : { scale: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography level="h3">Настройки</Typography>
            <Stack direction="row" alignItems="center" gap="4px">
              <IconButton circle>
                <Edit />
              </IconButton>
              <IconButton circle>
                <MoreVert />
              </IconButton>
            </Stack>
          </Stack>
        ) : (
          <Box
            component={motion.div}
            sx={{ width: "100%" }}
            initial={{ scale: 1.2 }}
            exit={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            animate={{ scale: 1 }}
          >
            <Input
              fullWidth
              endDecorator={
                statusSocket === "pending" ? (
                  <CircularProgress color="danger" value={50} size="sm" variant="plain" />
                ) : (
                  <Search />
                )
              }
              type="text"
              placeholder={statusSocket === "pending" ? "Соединение..." : "Поиск"}
              value={searchValue}
              maxLength="30"
              onChange={({ target: { value } }) => setSearchValue(value)}
              sx={{ boxShadow: "xs" }}
            />
          </Box>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default MainHeader;
