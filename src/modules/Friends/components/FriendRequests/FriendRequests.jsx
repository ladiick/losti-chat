import { Box, CircularProgress, List, Typography } from "@mui/joy";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import {
  useAcceptFriendRequestsMutation,
  useCancelFriendRequestsMutation,
} from "../../api/friendsApiSlice";
import FriendsItem from "../FriendsItem/FriendsItem";
import CustomScroll from "../../../../components/ui/CustomScroll/CustomScroll";

const FriendRequests = ({ data, isFetching }) => {
  //* requests*
  const [acceptFriendRequests] = useAcceptFriendRequestsMutation();
  const [cancelFriendRequests] = useCancelFriendRequestsMutation();
  //* requests*

  const handlerAccept = async (obj) => {
    try {
      await acceptFriendRequests({
        second_user: obj.friend.pk,
      }).unwrap();

      toast.success("Заявка принята", optionsNotification);
    } catch (err) {
      toast.error("Не удалось принять заявку", optionsNotification);
    }
  };

  const handlerCancel = async (obj, index) => {
    try {
      await cancelFriendRequests(obj.friend.pk).unwrap();
      toast.success("Заявка отклонена", optionsNotification);
    } catch (err) {
      toast.success("Не удалось отклонить", optionsNotification);
    }
  };

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
          level="h4"
          component={motion.h3}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          У вас нет заявок в друзья
        </Typography>
      </Box>
    );
  }

  return isFetching ? (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <CircularProgress variant="plain" size="sm" sx={{ margin: "auto" }} />
    </Box>
  ) : (
    <List
      sx={{ overflowY: "auto", gap: "4", ...CustomScroll }}
      component={motion.div}
      initial={{ left: -100, opacity: 0 }}
      animate={{ left: 0, opacity: 1 }}
    >
      {data.map((obj, index) => (
        <FriendsItem
          key={obj.pk}
          obj={obj}
          requests={"requests"}
          handlerAccept={() => handlerAccept(obj, index)}
          handlerCancel={() => handlerCancel(obj, index)}
        />
      ))}
    </List>
  );
};

export default FriendRequests;
