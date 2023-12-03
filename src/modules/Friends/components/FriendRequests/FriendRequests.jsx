import { Box, Typography } from "@mui/joy";
import React from "react";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import {
  useAcceptFriendRequestsMutation,
  useCancelFriendRequestsMutation,
} from "../../api/friendsApiSlice";
import FriendsItem from "../FriendsItem/FriendsItem";

const FriendRequests = ({ data }) => {
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
        <Typography textAlign="center" level="h4">
          У вас нет заявок в друзья
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* {allRequests === "allRequests" ? (
        data.map((obj, index) => (
          <FriendsItem
            key={obj.pk}
            obj={obj}
            requests={"requests"}
            handlerAccept={() => handlerAccept(obj, index)}
            handlerCancel={() => handlerCancel(obj, index)}
          />
        ))
      ) : ( */}
      {data.map((obj, index) => (
        <FriendsItem
          key={obj.pk}
          obj={obj}
          requests={"requests"}
          handlerAccept={() => handlerAccept(obj, index)}
          handlerCancel={() => handlerCancel(obj, index)}
        />
      ))}
      {/* <FriendsItem
        obj={data[0]}
        requests={"requests"}
        handlerAccept={() => handlerAccept(data[0], 0)}
        handlerCancel={() => handlerCancel(data[0], 0)}
      /> */}
      {/* )} */}
    </>
  );
};

export default FriendRequests;
