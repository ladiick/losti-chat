import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../../components/ui/ActionButton/ActionButton";
import SearchBlock from "../../../../components/ui/SearchBlock/SearchBlock";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import { searchFriend } from "../../../../redux/slices/navigationSlice";
import DeleteFriendModal from "../../../AllModals/DeleteFriendModal/DeleteFriendModal";
import WriteFriend from "../../../AllModals/WriteFriend/WriteFriend";
import { useGetFriendsQuery } from "../../api/friendsApiSlice";
import OutputFriends from "../OutputFriends/OutputFriends";
import s from "./MyFriends.module.scss";
function MyFriends() {
  const dispatch = useDispatch();
  const [searchValue, setSearch] = useState("");
  const { data } = useGetFriendsQuery();
  const deleteFriend = useSelector((state) => state.navigation.deleteFriend);
  const modal = useSelector((state) => state.navigation.modal.writeFriend);
  const navigation = useNavigate();

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        className={s.wrapper}
      >
        <div className={s.friends__empty}>
          У вас нет друзей! <span onClick={() => dispatch(searchFriend(true))}>Cкорее добавьте их</span>
        </div>
      </motion.div>
    );
  }

  return (
    <WrapperBlocks>
      {modal && <WriteFriend />}
      {deleteFriend && <DeleteFriendModal />}
      <header className={s.header}>
        <ActionButton style={{ cursor: "default", pointerEvents: "none" }} second={true}>
          Все друзья {data?.length}
        </ActionButton>

        <ActionButton onClick={() => navigation("/friends/find")}>Найти друзей</ActionButton>
      </header>
      <SearchBlock searchValue={searchValue} setSearch={setSearch} />
      <OutputFriends data={data} searchValue={searchValue} />
    </WrapperBlocks>
  );
}

export default MyFriends;
