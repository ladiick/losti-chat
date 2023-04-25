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
import AttachmentsInDialogs from "../DialogBoxes/AttachmentsInDialogs/AttachmentsInDialogs";


const Chat = () => {
	const dispatch = useDispatch()
	const myId = useSelector(state => state.user.aboutUser.id)
	const [searchParams, setSearchParams] = useSearchParams()
	const [skip, setSkip] = useState(true)
	const currentMessage = useSelector(state => state.message.currentMessage)
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)
	const viewAttachmentsInDialogs = useSelector(state => state.navigation.modal.viewAttachmentsInDialogs)

	const {isMobile} = useMatchMedia()

	const {data: peopleCurrent = {}, isLoading} = useGetCurrentPersonQuery(searchParams.get('dialogs'), {
		skip: searchParams?.get('dialogs') && myId ? searchParams?.get('dialogs') == String(myId) ? true : false : true
	})


	useEffect(() => {

		dispatch(openModalBlock(
			searchParams?.has('history') ? {
				viewAttachmentsInDialogs: true,
				viewForwardMessage: false
			} : {viewForwardMessage: false})
		)
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
					<SelectChat/>
					<Text style={{marginTop: 10}}>Выберите чат</Text>
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
			{viewAttachmentsInDialogs && <AttachmentsInDialogs/>}
		</WrapperBlocks>
	)
}


const SelectChat = ({...props}) => {
	return <svg width="56" height="56" {...props} viewBox="0 0 56 56" fill="none">
		<path fillRule="evenodd" clipRule="evenodd"
		      d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 0 1 .3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 0 1-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 0 1 1.69-.43 17.06 17.06 0 0 0 6.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 0 1-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 0 1-2.53-8.08z"
		      fill="currentColor">
		</path>
		<path fillRule="evenodd" clipRule="evenodd"
		      d="M43.01 18.77a1.5 1.5 0 0 0 .38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 0 0-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 0 0-1.69-.43 17.06 17.06 0 0 1-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 0 0-1.44 2.63 20.19 20.19 0 0 0 15.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 0 0 2.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 0 1-.76-3.18 14.28 14.28 0 0 0 2.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 0 0-2.09.38z"
		      fill="currentColor">
		</path>
	</svg>
}


export default React.memo(Chat)