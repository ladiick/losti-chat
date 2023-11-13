import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import NavigationWrapper from "../../../../components/ui/Navigation/components/NavigationWrapper/NavigationWrapper";
import ListItems from "../../../../components/ui/Navigation/components/ListItems/ListItems";
import NavigationItem from "../../../../components/ui/Navigation/components/NavigationItem/NavigationItem";
import { useGetFriendsRequestsQuery } from "../../../Friends/api/friendsRequestsApiSlice";
import { navItems } from "./helpers/navItems";
import NameCompany from '../../../../components/ui/NameCompany/NameCompany'
const Navigation = () => {
  const { data: countRequests = [] } = useGetFriendsRequestsQuery();

  const myId = useSelector((state) => state.user.aboutUser.id);

  const navItemsMemo = useMemo(() => {
    return navItems(myId, countRequests?.length);
  }, [countRequests, myId]);

  return (
    <NavigationWrapper style={{ width: "190px", marginRight: 15 }}>
      <NameCompany title={"LOSTI-CHAT"} style={{ marginBottom: 20 }} />
      <ListItems>
        {navItemsMemo?.map((obj) => (
          <NavigationItem key={obj.id} obj={obj} styleItem={{marginBottom:10}} />
        ))}
      </ListItems>
    </NavigationWrapper>
  );
};

export default Navigation;
