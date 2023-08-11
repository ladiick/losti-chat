import React from 'react';
import s from "./ProfileInfoAnotherUser.module.scss";
import { ActionButton } from "../../ui/Button/ActionButton/ActionButton";
import {BsPersonCheck} from "react-icons/bs";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import {useGetCurrentPersonQuery} from "../../features/currentPeopleApiSlice";
import {useParams} from "react-router-dom";
import {useGetIsFriendQuery} from "../../features/isFriendApiSlice";

const ProfileInfoAnotherUser = () => {
	const {id} = useParams()
	const {data, isLoading} = useGetCurrentPersonQuery(id)
	const {data: isFriend} = useGetIsFriendQuery(id)


	return (
		<ProfileInfo image={data?.image}
		             online={data?.online}
		             isLoading={isLoading}
		             firstName={data?.first_name} lastName={data?.last_name}>

			<div className={s.block__communicate}>

				{
					isLoading ?

						<>
							<span className={s.loading__btn} style={{marginRight: 5}}></span>
							<span className={s.loading__btn}></span>
						</>
						:
						<>
							<ActionButton style={{marginRight: 5}}>Сообщение</ActionButton>

							{isFriend?.is_friend ? <ActionButton
									leftIcon={<BsPersonCheck
										style={{width: 24, height: 24}}/>}
									second/>
								:
								<ActionButton>Добавить в друзья</ActionButton>}
						</>
				}
			</div>

		</ProfileInfo>


	);
};

export default ProfileInfoAnotherUser;
