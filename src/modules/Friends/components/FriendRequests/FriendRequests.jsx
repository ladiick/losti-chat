import React from "react";
import s from "./FriendRequests.module.scss";
import FriendsItem from "../../../../components/FriendsItem/FriendsItem";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetFriendsRequestsQuery } from "../../api/friendsRequestsApiSlice";
import { useAcceptFriendRequestsMutation, useCancelFriendRequestsMutation } from "../../api/friendsApiSlice";
import { toast } from "react-toastify";
import { optionsNotification } from "../../../../components/actions/optionsNotification";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import Text from "../../../../components/ui/Text/Text";

const FriendRequests = ({ allRequests }) => {
  const location = useLocation();
  const { isMobile } = useMatchMedia();
  //*requests*
  const { data: friendRequests = [] } = useGetFriendsRequestsQuery();
  const [acceptFriendRequests, { isError }] = useAcceptFriendRequestsMutation();
  const [cancelFriendRequests] = useCancelFriendRequestsMutation();
  //*requests*

  const handlerAccept = async (obj, index) => {
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

  if (friendRequests?.length === 0 && location.pathname === "/friends/requests") {
    return (
      <WrapperBlocks style={{ textAlign: "center" }}>
        <Text>У вас нет заявок в друзья</Text>
      </WrapperBlocks>
    );
  } else if (friendRequests?.length === 0) {
    return;
  }

  return (
    <motion.div
      initial={{
        y: -200,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "tween",
        duration: 0.5,
      }}
      className={location.pathname !== "/friends/requests" ? s.wrapper : s.wrapper__requests}
    >
      <header className={s.wrapper__header}>
        <span>Заявки в друзья {friendRequests?.length !== 1 && friendRequests?.length !== 0 ? friendRequests?.length !== 1 : ""}</span>
        {location.pathname !== "/friends/requests" && friendRequests?.length !== 1 && friendRequests?.length !== 0 && (
          <Link to={"/friends/requests"}>
            Показать всех
            <svg height="24px" version="1.1" viewBox="0 0 512 512" width="24px">
              <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
            </svg>
          </Link>
        )}
      </header>

      {allRequests === "allRequests" ? (
        friendRequests.map((obj, index) => (
          <FriendsItem
            key={obj.pk}
            obj={obj}
            requests={"requests"}
            handlerAccept={() => handlerAccept(obj, index)}
            handlerCancel={() => handlerCancel(obj, index)}
          />
        ))
      ) : (
        <FriendsItem
          obj={friendRequests[0]}
          requests={"requests"}
          handlerAccept={() => handlerAccept(friendRequests[0], 0)}
          handlerCancel={() => handlerCancel(friendRequests[0], 0)}
        />
      )}
    </motion.div>
  );
};

export default FriendRequests;
