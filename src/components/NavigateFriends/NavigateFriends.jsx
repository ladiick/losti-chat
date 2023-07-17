import React from "react";
import s from "./NavigateFriends.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetFriendsRequestsQuery } from "../../modules/Friends/api/friendsRequestsApiSlice";
import Text from "../ui/Text/Text";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";

const NavigateFriends = () => {
  const location = useLocation();
  const classActive = ({ isActive }) => (isActive ? s.active : "");
  const { data: friendRequests = [] } = useGetFriendsRequestsQuery();

  return (
    <WrapperBlocks style={{ marginBottom: "var(--marginBlock)" }}>
      <ul className={s.list__nav__items}>
        <li className={s.nav__items}>
          <NavLink to="/friends" title="Мои друзья" className={location.pathname === "/friends" && classActive}>
            <Text pointer>Мои друзья</Text>
          </NavLink>
        </li>
        <li className={s.nav__items}>
          <NavLink to="requests" title="Заявки в друзья" className={classActive}>
            <Text pointer>Заявки в друзья</Text>
            {friendRequests?.length === 0 ? "" : <span className={s.quantity__requests}>{friendRequests?.length}</span>}
          </NavLink>
        </li>
        <li className={s.nav__items}>
          <NavLink to="find" title="Поиск друзей" className={classActive}>
            <Text pointer>Поиск друзей</Text>
          </NavLink>
        </li>
      </ul>
    </WrapperBlocks>
  );
};

export default NavigateFriends;
