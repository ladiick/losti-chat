import { AddCircle } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, List, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { LeftColumnContext } from "../../../LeftColumn/LeftColumn";
import DeleteFriendModal from "../../Modal/DeleteFriendModal";
import FriendsItem from "../FriendsItem/FriendsItem";

function MyFriends({ data, setTab, isFetching }) {
  const deleteFriend = useSelector((state) => state.navigation.deleteFriend);
  const { searchValue } = useContext(LeftColumnContext);

  if (data?.length === 0) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
        }}
      >
        <Typography
          textAlign="center"
          level="h3"
          component={motion.h3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          У вас нет друзей!
        </Typography>
        <Typography
          component={motion.h4}
          level="h4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          justifyContent="center"
          endDecorator={
            <IconButton onClick={() => setTab(2)}>
              <AddCircle />
            </IconButton>
          }
        >
          Cкорее добавьте их
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {deleteFriend && <DeleteFriendModal />}
      {isFetching ? (
        <Box
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <CircularProgress variant="plain" size="sm" sx={{ margin: "auto" }} />
        </Box>
      ) : (
        <List
          sx={{ overflowY: "auto", gap: "4", ...CustomScroll }}
          component={motion.div}
          initial={{ left: -100, opacity: 0 }}
          animate={{ left: 0, opacity: 1 }}
        >
          {searchValue ? (
            data
              ?.filter(
                (obj) =>
                  obj.friend.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  obj.friend.last_name.toLowerCase().includes(searchValue.toLowerCase()),
              )
              ?.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)
              ?.length ? (
              data
                ?.filter(
                  (obj) =>
                    obj.friend.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    obj.friend.last_name.toLowerCase().includes(searchValue.toLowerCase()),
                )
                ?.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)
            ) : (
              <Typography level="h4" textAlign="center">
                По вашему запросу ничего не найдено
              </Typography>
            )
          ) : (
            data?.map((obj, index) => <FriendsItem key={obj.id} obj={obj} index={index} />)
          )}
        </List>
      )}
    </>
  );
}

export default MyFriends;
