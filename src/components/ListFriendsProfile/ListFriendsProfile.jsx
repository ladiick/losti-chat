import React from "react";
import s from "./ListFriendsProfile.module.scss";

import { useGetFriendsQuery } from "../../modules/Friends/api/friendsApiSlice";

import ListFriendsProfileItem from "./components/ListFriendsProfileItem/ListFriendsProfileItem";
import useMatchMedia from "../hooks/useMatchMedia";
import { useGetFriendsRequestsQuery } from "../../modules/Friends/api/friendsRequestsApiSlice";
import { useParams } from "react-router-dom";
import { useGetAboutFriendsUserQuery } from "../features/aboutFriendsUserApiSlice";
import { useSelector } from "react-redux";
import Typography from "../ui/Typography/Typography";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";

const ListFriendsProfile = () => {
  const { id } = useParams();
  const myId = useSelector((state) => state.user.aboutUser.id);

  const { data: friends = [] } = useGetFriendsQuery();
  const { data: request = [] } = useGetFriendsRequestsQuery();
  const { isMobile } = useMatchMedia();
  const { data: getFriendsFriends } = useGetAboutFriendsUserQuery(id);

  if (isMobile) {
    return (
      <WrapperBlocks className={s.wrapper__friends}>
        <Typography>
          Друзья <span>{friends?.length}</span> {request.length ? <span>&#183; {request.length}</span> : ""}
        </Typography>
        <div className={s.items}>
          {myId === id
            ? friends?.map((obj, index) => {
                if (index > 3) {
                  return "";
                } else {
                  return <ListFriendsProfileItem key={obj.id} obj={obj} index={index} />;
                }
              })
            : getFriendsFriends?.map((obj, index) => <ListFriendsProfileItem key={obj.id} obj={obj} index={index} />)}
        </div>
      </WrapperBlocks>
    );
  }

  return (
    <WrapperBlocks className={s.wrapper__friends}>
      <Typography level={4}>
        Друзья <span>{friends?.length}</span>
      </Typography>
      <div className={s.items}>
        {myId === id
          ? friends?.map((obj, index) => <ListFriendsProfileItem key={obj.id} obj={obj} index={index} />)
          : getFriendsFriends?.map((obj, index) => <ListFriendsProfileItem key={obj.id} obj={obj} index={index} />)}
      </div>
    </WrapperBlocks>
  );
};

export default ListFriendsProfile;
