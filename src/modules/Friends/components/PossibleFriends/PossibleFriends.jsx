import { Box, List, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";
import { useAcceptFriendRequestsMutation } from "../../api/friendsApiSlice";
import PossibleFriendsItem from "./components/PossibleFriendsItem/PossibleFriendsItem";

const PossibleFriends = ({ data }) => {
  const [acceptFriendRequests] = useAcceptFriendRequestsMutation();

  const handlerPeople = async (obj) => {
    try {
      await acceptFriendRequests({
        second_user: obj.possible_friend.pk,
      }).unwrap();

      toast.success("Заявка отправлена", optionsNotification);
    } catch (err) {
      toast.error("Ошибка, заявка не отправлена, попробуйте позже", optionsNotification);
    }
  };
  if (data.length === 0) {
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
          level="h4"
          component={motion.h3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          У вас нет возможных друзей
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ overflowY: "auto", gap: "4px", ...CustomScroll }}>
      {data?.map((obj) => (
        <PossibleFriendsItem
          key={obj.possible_friend.pk}
          obj={obj}
          handlerPeople={() => handlerPeople(obj)}
        />
      ))}
    </List>
  );
};

export default PossibleFriends;
