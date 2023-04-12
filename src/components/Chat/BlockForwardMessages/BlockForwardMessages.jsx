import React from 'react';
import s from './BlockForwardMessages.module.scss'
import Text from '../../ui/Text/Text'
import {convertTime} from "../../actions/convertTime";
import CloseButton from "../../ui/CloseButton/CloseButton";
import {changeDeclination} from "../../actions/changeDeclination";
import {useDispatch} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {clearForwardMessage} from "../../../redux/slices/messageSlice";
import {openModalBlock} from "../../../redux/slices/navigationSlice";

const BlockForwardMessages = ({message}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const dispatch = useDispatch()
	const closeForward = () => {
		dispatch(clearForwardMessage({param: searchParams.get('dialogs')}))
	}

	const viewForwardedMessage = () => {
		dispatch(openModalBlock({viewForwardMessage: true}))
	}


	if (message?.length > 1) {
		return (
			<>
				<div className={s.wrapper__forward__msg}>
					<div className={s.forward__content}>
						<Text className={s.name__time} weight='strong'>
							Пересланные сообщения
						</Text>
						<Text className={s.message__forward} onClick={viewForwardedMessage}>
							{changeDeclination(message?.length, 'message')}
						</Text>
					</div>
					<CloseButton className={s.close__btn} onClick={() => closeForward()}/>

				</div>
			</>
		)
	}


	return (
		<div className={s.wrapper__forward__msg}>
			<div className={s.forward__content}>

				<Text className={s.name__time} weight='strong'>
					{message?.[0]?.sender?.first_name + ' ' + message?.[0]?.sender?.last_name}
					<Text className={s.message__time}>
						{convertTime(message?.[0]?.time)}
					</Text>
				</Text>

				{
					message?.[0]?.message ?
						<Text
							className={s.message__forward}
							onClick={viewForwardedMessage}>{message?.[0]?.message}
						</Text>
						:
						<Text className={s.message__forward} onClick={viewForwardedMessage}>
							{changeDeclination(message?.length, 'message')}
						</Text>
				}
			</div>
			<CloseButton className={s.close__btn} onClick={() => closeForward()}/>

		</div>
	);
};

export default BlockForwardMessages;
