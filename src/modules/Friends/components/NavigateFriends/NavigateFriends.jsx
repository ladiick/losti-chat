import React, { useMemo } from "react";
import ListItems from "../../../../components/ui/Navigation/components/ListItems/ListItems";
import NavigationItem from "../../../../components/ui/Navigation/components/NavigationItem/NavigationItem";
import NavigationWrapper from "../../../../components/ui/Navigation/components/NavigationWrapper/NavigationWrapper";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import { useGetFriendsRequestsQuery } from "../../api/friendsRequestsApiSlice";
import { listItems } from "./helpers/listItems";
const NavigateFriends = () => {
  const { data: friendRequests = [] } = useGetFriendsRequestsQuery();

  const navItems = useMemo(() => {
    return listItems(friendRequests?.length);
  }, [friendRequests]);

  return (
    <WrapperBlocks style={{ marginBottom: "var(--marginBlock)" }}>
      <NavigationWrapper style={{ width: "100%" }}>
        <ListItems>
          {navItems?.map((item) => (
            <NavigationItem key={item.href} obj={item} style={{ padding: "10px 12px" }} />
          ))}
        </ListItems>
      </NavigationWrapper>
    </WrapperBlocks>
  );
};

export default NavigateFriends;
