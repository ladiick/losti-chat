import React from 'react';
import s from './FriendRequests.module.scss'
import {useDispatch, useSelector} from "react-redux";
import FriendsItem from "../FriendsItem/FriendsItem";
import {Link, useLocation} from "react-router-dom";
import {motion} from 'framer-motion'
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
import {useAcceptFriendRequestsMutation, useCancelFriendRequestsMutation} from "../features/friendsApiSlice";

const FriendRequests = ({allRequests}) => {

    const location = useLocation()

    //*requests*
        const {data: friendRequests = []} = useGetFriendsRequestsQuery()
        const [acceptFriendRequests,{isError}] = useAcceptFriendRequestsMutation()
        const [cancelFriendRequests] = useCancelFriendRequestsMutation()
    //*requests*

    const handlerAccept = async (obj, index) => {
        await acceptFriendRequests({
            second_user: obj.friend.pk
        }).unwrap()
    }
    const handlerCancel = async (obj, index) => {
        await cancelFriendRequests(obj.friend.pk).unwrap()
    }


    if (friendRequests?.length === 0 && location.pathname === '/friends/requests') {
        return (
            <motion.div
                initial={{
                    y: -200,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    type: 'tween',
                    duration: 0.5
                }}
                className={s.wrapper__requests}>
                <div style={{textAlign: 'center', fontSize: 14}}>У вас нет заявок в друзья</div>
            </motion.div>
        )
    } else if (friendRequests?.length === 0) {
        return
    }


    return (
        <motion.div
            initial={{
                y: -200,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                type: 'tween',
                duration: 0.5

            }}
            className={location.pathname !== '/friends/requests' ? s.wrapper : s.wrapper__requests}>
            <header className={s.wrapper__header}>
				<span>
					Заявки в друзья {friendRequests?.length}
				</span>
                {location.pathname !== '/friends/requests' && <Link to={'/friends/requests'}>
                    Показать всех
                    <svg height="24px" version="1.1" viewBox="0 0 512 512" width="24px">
                        <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/>
                    </svg>
                </Link>}
            </header>


            {allRequests === 'allRequests' ?
                friendRequests.map((obj, index) => <FriendsItem
                    key={obj.pk} obj={obj} requests={'requests'}
                    handlerAccept={() => handlerAccept(obj, index)}
                    handlerCancel={() => handlerCancel(obj, index)}
                />)
                :
                <FriendsItem obj={friendRequests[0]}
                             requests={'requests'}
                             handlerAccept={() => handlerAccept(friendRequests[0], 0)}
                             handlerCancel={() => handlerCancel(friendRequests[0], 0)}/>
            }


        </motion.div>
    );
};

export default FriendRequests;
