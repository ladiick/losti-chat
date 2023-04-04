import {useSelector} from "react-redux";
import React from "react";
import useMatchMedia from "../hooks/useMatchMedia";
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationWrapper from "./NavigationWrapper/NavigationWrapper";
import {authItems, noAuthItems} from "../../utils/utils";

const Navigation = () => {
    const {isMobile} = useMatchMedia()
    const {data: countRequests = []} = useGetFriendsRequestsQuery()

    const myId = useSelector(state => state.user.aboutUser.id)

    if (localStorage.getItem('accessToken') === 'undefined') {
        return (
            <NavigationWrapper>
                {noAuthItems.map((obj) => (
                    <NavigationItem key={obj.id} obj={obj}/>
                ))}
            </NavigationWrapper>

        )
    }

    return (
        <NavigationWrapper>
            {authItems(myId, countRequests.length, isMobile).map((obj, index) => (
                <NavigationItem key={obj.id} obj={obj} index={index}/>
            ))}
        </NavigationWrapper>

    )

}

export default Navigation