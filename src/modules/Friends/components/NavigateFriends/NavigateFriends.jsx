import React, { useMemo } from "react";
import { useGetFriendsRequestsQuery } from "../../api/friendsRequestsApiSlice";
import NavigationWrapper from "../../../../components/ui/Navigation/components/NavigationWrapper/NavigationWrapper";
import ListItems from "../../../../components/ui/Navigation/components/ListItems/ListItems";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import { listItems } from './helpers/listItems'
import NavigationItem from '../../../../components/ui/Navigation/components/NavigationItem/NavigationItem'
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
