import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import FriendRequests from "../../modules/Friends/components/FriendRequests/FriendRequests";
import MyFriends from "../../modules/Friends/components/MyFriends/MyFriends";
import NavigateFriends from "../../modules/Friends/components/NavigateFriends/NavigateFriends";
import PossibleFriends from "../../modules/Friends/components/PossibleFriends/PossibleFriends";
import s from "./Friends.module.scss";

const Friends = () => {
  const location = useLocation();
  const { isMobile } = useMatchMedia();

  useEffect(() => {
    document.title = "Друзья";
  }, []);

  const ifOutlet = () => {
    if (location.pathname !== "/friends") {
      return <Outlet />;
    } else {
      return (
        <>
          <FriendRequests />
          <MyFriends />
        </>
      );
    }
  };

  return (
    <div className={s.friend__page} style={{ position: "fixed", right: 0, top: 0, bottom: 0 }}>
      <div className={s.wrapper__friends}>{ifOutlet()}</div>
      <div className={s.nav__block}>
        {!isMobile && <NavigateFriends />}
        <PossibleFriends />
      </div>
    </div>
  );
};

export default Friends;
