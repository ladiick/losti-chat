import React, {useState} from 'react';
import s from './WhoForwardMessage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
	forwardMessageFlag,
	forwardMessageSendFlag,
	openChatBlock,
	searchFriend
} from "../../../redux/slices/navigationSlice";
import SearchBlock from "../../SearchBlock/SearchBlock";
import AllPeopleItem from "../../AllPeopleItem/AllPeopleItem";

import {Dialog} from "@headlessui/react";
import {motion} from 'framer-motion'
import {FiArrowLeft} from "react-icons/fi";
import useMatchMedia from "../../hooks/useMatchMedia";
import {useGetPeopleQuery} from "../../features/peopleApiSlice";
import PeopleItem from "../../PeopleItem/PeopleItem";
import favorite from "../../assets/favorite.svg";
import {setIndex} from "../../../redux/slices/peopleSlice";
import {useSearchParams} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import {clearMessage, sendMessagesOnChat, setPreValueSearch} from "../../../redux/slices/messageSlice";
import ModalDialog from "../../ui/Modal/ModalDialog";

const WhoForwardMessage = () => {
	const dispatch = useDispatch()
	const [searchValue, setSearch] = useState('');
	const isVisible = useSelector(state => state.navigation.forwardMessageFlag)
	const {isMobile} = useMatchMedia()

	const {data: people = [], isLoading, isError} = useGetPeopleQuery()

	const myId = useSelector(state => state.user.aboutUser.id)
	const [searchParams, setSearchParams] = useSearchParams()

	const forwardMessage = useSelector(state => state.message.currentMessage[searchParams?.get('dialogs')])
	const closeFunc = () => {
		dispatch(forwardMessageFlag(false))
	}
	const handlerPeople = (current__obj, index) => {
		dispatch(setIndex(index))
		setSearchParams({dialogs: current__obj.pk})
		setSearch('')
		dispatch(sendMessagesOnChat({
			param: current__obj.pk,
			forwardMessage
		}))
		dispatch(clearMessage({param: searchParams?.get('dialogs')}))
		dispatch(forwardMessageFlag(false))
	}

	return (
		<ModalDialog
			title='Переслать сообщения'
			open={isVisible}
			closeFunc={closeFunc}>
			<SearchBlock searchValue={searchValue} setSearch={setSearch}/>

			<div className={s.list__allpeople}>

				<Oval
					height="32"
					width="32"
					color="#1A73E8"
					secondaryColor="#434343"
					strokeWidth={4}
					strokeWidthSecondary={4}
					visible={isLoading}
				/>

				{people?.filter(obj => obj?.sender?.pk === myId && obj?.recip?.pk !== myId ?
					obj?.recip?.first_name?.toLowerCase().includes(searchValue?.toLowerCase())
					||
					obj?.recip?.last_name.toLowerCase().includes(searchValue.toLowerCase())
					:
					obj?.sender?.first_name.toLowerCase().includes(searchValue.toLowerCase())
					||
					obj?.sender?.last_name.toLowerCase().includes(searchValue.toLowerCase()))?.map((obj, index) =>
					obj?.sender?.pk === myId && obj?.recip?.pk !== myId ?
						<PeopleItem
							key={obj.recip.pk}
							id={obj.recip.pk}
							firstName={obj.recip.first_name}
							lastName={obj.recip.last_name}
							message={`Вы: ${obj.message}`}
							time={obj.time}
							img={obj.recip.image}
							handlerPeople={() => handlerPeople(obj.recip, index)}
							obj={obj.recip}
							index={index}
							flag={'forward'}
						/>
						: obj?.sender?.pk === myId && obj?.recip?.pk === myId
							?
							<PeopleItem
								key={0}
								id={obj.sender.pk}
								firstName={'Избранное'}
								lastName={''}
								message={obj.message}
								time={obj.time}
								img={favorite}
								handlerPeople={() => handlerPeople(obj.sender, index)}
								obj={obj.sender}
								index={index}
								flag={'forward'}

							/>

							:
							<PeopleItem
								key={obj.sender.pk}
								id={obj.sender.pk}
								firstName={obj.sender.first_name}
								lastName={obj.sender.last_name}
								message={obj.message}
								time={obj.time}
								img={obj.sender.image}
								handlerPeople={() => handlerPeople(obj.sender, index)}
								obj={obj.sender}
								index={index}
								flag={'forward'}

							/>
				)}

			</div>
		</ModalDialog>
	);
};

export default WhoForwardMessage;
