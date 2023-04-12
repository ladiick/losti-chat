import React from 'react';
import ModalDialog from "../../ui/Modal/ModalDialog";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import {Link, useSearchParams} from "react-router-dom";
import s from './ViewForwardedMessage.module.scss'
import Text from "../../ui/Text/Text";
import EmptyImage from "../../ui/EmptyImage/EmptyImage";
import {convertTime} from "../../actions/convertTime";
import MessageForward from "../../Message/MessageForward/MessageForward";

const ViewForwardedMessage = () => {
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const messages = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.forwardMessage)
	const manyForwardMessage = useSelector(state => state.message.forwardManyMessage)
	const closeFunc = () => {
		dispatch(openModalBlock({viewForwardMessage: false}))
	}

	return (
		<ModalDialog title='Переслать сообщения'
		             open={isVisible}
		             closeFunc={closeFunc}>
			<div className={s.wrapper__info}>
				<MessageForward forward={messages}/>
			</div>
		</ModalDialog>
	);
};

export default ViewForwardedMessage;
