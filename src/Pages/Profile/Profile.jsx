import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Gallery from "../../components/Gallery/Gallery";
import ListFriendsProfile from "../../components/ListFriendsProfile/ListFriendsProfile";
import ProfileInfoMe from "../../components/ProfileInfo/ProfileInfoMe";
import s from "./Profile.module.scss";

const Profile = () => {
  const { id } = useParams();

  const myId = useSelector((state) => state.user.aboutUser.id);
  const location = useLocation();

  if (location.pathname === `/profile/${myId}/settings`) {
    return <Outlet />;
  }

  return (
    <>
      <div className={s.wrapper__friends}>
        <ProfileInfoMe />
        <div className={s.my_friends__photo_block}>
          <div className={s.photo}>
            <Gallery />
          </div>
          <div className={s.friend}>
            <ListFriendsProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
