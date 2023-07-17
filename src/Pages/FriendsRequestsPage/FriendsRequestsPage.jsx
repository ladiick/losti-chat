import React, { useEffect } from "react";
import FriendRequests from "../../modules/Friends/components/FriendRequests/FriendRequests";

const FriendsRequestsPage = () => {
  useEffect(() => {
    document.title = "Запросы в друзья";
  }, []);
  return <FriendRequests allRequests={"allRequests"} />;
};

export default FriendsRequestsPage;
