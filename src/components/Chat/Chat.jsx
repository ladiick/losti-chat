import s from './Chat.module.scss'
import Communication from "../Communication/Communication";
import {useDispatch, useSelector} from "react-redux";
import message__logo from '../assets/messages.svg'
import {useSearchParams} from "react-router-dom";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

import {useGetCurrentPersonQuery} from "../features/currentPeopleApiSlice";
import useMatchMedia from "../hooks/useMatchMedia";
import HeaderChat from "./HeaderChat/HeaderChat";
import BlockInputs from "./BlockInputs/BlockInputs";
import HeaderForwardMessage from "./HeaderForwardMessage/HeaderForwardMessage";
import ViewForwardedMessage from "../DialogBoxes/ViewForwardedMessage/ViewForwardedMessage";
import {openModalBlock} from "../../redux/slices/navigationSlice";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";
import Text from "../ui/Text/Text";



const Chat = () => {
	const dispatch = useDispatch()
	const myId = useSelector(state => state.user.aboutUser.id)
	const [searchParams, setSearchParams] = useSearchParams()
	const [skip, setSkip] = useState(true)
	const currentMessage = useSelector(state => state.message.currentMessage)
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)

	const {isMobile} = useMatchMedia()

	const {data: peopleCurrent = {}, isLoading} = useGetCurrentPersonQuery(searchParams.get('dialogs'), {
		skip: searchParams?.get('dialogs') && myId ? searchParams?.get('dialogs') == String(myId) ? true : false : true
	})


	useEffect(() => {
		dispatch(openModalBlock({viewForwardMessage: false}))
		const onKeypress = e => {
			if (e.code === 'Escape') {
				setSearchParams('')
			}
		}

		document?.addEventListener('keydown', onKeypress);

		return () => {
			document?.removeEventListener('keydown', onKeypress);
		};
	}, [searchParams?.get('dialogs')]);


	if (!searchParams.get('dialogs') && !isMobile) {
		return (
			<WrapperBlocks className={s.emptity__chat}>
				<div className={s.emptity__content}>
					<img src={message__logo} alt='message'/>
					<Text style={{marginTop:5}}>Выберите чат</Text>
				</div>
			</WrapperBlocks>
		)
	}
	return (
		<WrapperBlocks className={s.wrapper}>
			<HeaderChat myId={myId} isLoading={isLoading} peopleCurrent={peopleCurrent}/>

			<Communication/>

			{currentMessage?.[searchParams.get('dialogs')]?.length && isMobile ? <HeaderForwardMessage/> : <BlockInputs/>}

			{isVisible && <ViewForwardedMessage/>}
		</WrapperBlocks>
	)
}

export default React.memo(Chat)