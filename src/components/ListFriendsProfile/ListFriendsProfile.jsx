import React from 'react';
import s from './ListFriendsProfile.module.scss'

import {useGetFriendsQuery} from "../features/friendsApiSlice";

import ListFriendsProfileItem from "../ListFriendsProfileItem/ListFriendsProfileItem";
import useMatchMedia from "../hooks/useMatchMedia";
import {useGetFriendsRequestsQuery} from "../features/friendsRequestsApiSlice";
import {useParams} from "react-router-dom";
import {useGetAboutFriendsUserQuery} from "../features/aboutFriendsUserApiSlice";
import {useSelector} from "react-redux";
import Title from "../ui/Title/Title";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";

const ListFriendsProfile = () => {
	const {id} = useParams()
	const myId = useSelector(state => state.user.aboutUser.id)

	const {data: friends = []} = useGetFriendsQuery()
	const {data: request = []} = useGetFriendsRequestsQuery()
	const {isMobile} = useMatchMedia()
	const {data: getFriendsFriends} = useGetAboutFriendsUserQuery(id)

	if (isMobile) {
		return (
			<WrapperBlocks className={s.wrapper__friends}>
				<Title>Друзья <span>{friends?.length}</span> {request.length ? <span>&#183; {request.length}</span> : ''}
				</Title>
				<div className={s.items}>

					{
						myId === id ?

						friends?.map((obj, index) => {
								if (index > 3) {
									return ''
								} else {
									return <ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>
								}
							}
						)
							:
							getFriendsFriends?.map((obj,index)=><ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>)

					}

				</div>
			</WrapperBlocks>
		);
	}


	return (
		<WrapperBlocks className={s.wrapper__friends}>
			<Title level={4}>Друзья <span>{friends?.length}</span></Title>
			<div className={s.items}>
				{
					myId === id ?

					friends?.map((obj, index) => (<ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>))
						:
						getFriendsFriends?.map((obj,index)=><ListFriendsProfileItem key={obj.id} obj={obj} index={index}/>)
				}
			</div>
		</WrapperBlocks>
	);
};

export default ListFriendsProfile;