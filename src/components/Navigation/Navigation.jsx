import { useSelector } from "react-redux";
import React from "react";
import useMatchMedia from "../hooks/useMatchMedia";
import { useGetFriendsRequestsQuery } from "../../modules/Friends/api/friendsRequestsApiSlice";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationWrapper from "./NavigationWrapper/NavigationWrapper";
import { authItems, noAuthItems } from "../../utils/utils";

const Navigation = () => {
  const { isMobile } = useMatchMedia();
  const { data: countRequests = [] } = useGetFriendsRequestsQuery();

  const myId = useSelector((state) => state.user.aboutUser.id);

  return (
    <NavigationWrapper>
      {authItems(myId, countRequests.length, isMobile)?.map((obj, index) => (
        <NavigationItem key={obj.id} obj={obj} index={index} />
      ))}
    </NavigationWrapper>
  );
};

export default Navigation;
