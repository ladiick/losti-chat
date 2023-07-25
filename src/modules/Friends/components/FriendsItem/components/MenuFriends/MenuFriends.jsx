import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteFriend } from "../../../../../../redux/slices/navigationSlice";
import s from "./MenuFriends.module.scss";
import MenuOnHover from '../../../../../../components/ui/MenuOnHover/MenuOnHover'
import Text from '../../../../../../components/ui/Text/Text'
const MenuFriends = ({ friend }) => {
  const [onHovered, setOnHovered] = useState();
  const dispatch = useDispatch();
  const deleteFriendFunc = () => {
    dispatch(deleteFriend({ flag: true, obj: friend?.friend }));
  };

  return (
    <MenuOnHover
      style={{ right: 0 }}
      onHovered={setOnHovered}
      className={s.wrapper__menu}
      onHover={<BsThreeDots color={onHovered ? "var(--color--text--main)" : "var(--icon--secondary)"} size={24} />}
    >
      <ul className={s.list}>
        <li className={s.item}>
          <Text style={{ cursor: "pointer" }} onClick={deleteFriendFunc}>
            Удалить из друзей
          </Text>
        </li>
      </ul>
    </MenuOnHover>
  );
};

export default MenuFriends;
