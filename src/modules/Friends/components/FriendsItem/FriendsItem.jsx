import React from "react";
import { useDispatch } from "react-redux";
import { setFriendsCurrent } from "../../slices/friendsSlice.js";
import { deleteFriend, openModalBlock } from "../../../../redux/slices/navigationSlice";
import BtnRequestsFriend from "./components/BtnRequestsFriend/BtnRequestsFriend";
import s from "./FriendsItem.module.scss";

import { BiMessageRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import ActionLink from "../../../../components/ui/ActionLink/ActionLink";
import Avatar from "../../../../components/ui/Avatar/Avatar";
import MenuFriends from "./components/MenuFriends/MenuFriends.jsx";
import useMatchMedia from "../../../../components/hooks/useMatchMedia.jsx";
import Text from "../../../../components/ui/Text/Text.jsx";

const FriendsItem = ({ obj, requests, handlerCancel, handlerAccept, index }) => {
  const dispatch = useDispatch();

  const { isMobile } = useMatchMedia();

  const deleteFriendFunc = () => {
    dispatch(deleteFriend({ flag: true, obj: obj.friend }));
  };

  const openWriteBox = () => {
    dispatch(openModalBlock({ writeFriend: true }));
    dispatch(setFriendsCurrent(obj));
  };

  return (
    <div className={s.wrapper__item}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Link to={`/profile/${obj.friend.pk}`}>
          <Avatar
            image={obj?.friend?.image}
            online={obj?.friend?.online}
            sizeIndicator={{ right: 6 }}
            size={{
              width: isMobile ? 44 : 80,
              height: isMobile ? 44 : 80,
            }}
          />
        </Link>
        <div className={s.info__user}>
          <ActionLink to={`/profile/${obj.friend.pk}`}>
            {obj.friend.first_name} {obj.friend.last_name}
          </ActionLink>

          {requests !== "requests" ? (
            <Text type={"button"} className={s.writeAMessage} onClick={openWriteBox}>
              {isMobile ? <BiMessageRounded /> : "Написать сообщение"}{" "}
            </Text>
          ) : (
            <BtnRequestsFriend handlerCancel={handlerCancel} handlerAccept={handlerAccept} />
          )}
        </div>
      </div>
      {/*{requests !== 'requests'*/}
      {/*    && <ActionButton*/}
      {/*        second*/}
      {/*        onClick={deleteFriendFunc}>Удалить из друзей</ActionButton>*/}
      {/*}*/}
      <MenuFriends friend={obj} />
    </div>
  );
};

export default FriendsItem;
