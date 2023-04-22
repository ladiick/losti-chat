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
import {setForwardMessageIfMany} from "../../../redux/slices/messageSlice";

const ViewForwardedMessage = () => {
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const messages = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.forwardMessage)
	const manyForwardMessage = useSelector(state => state.message.forwardManyMessage)

	const closeFunc = () => {
		dispatch(openModalBlock({viewForwardMessage: false}))
		dispatch(setForwardMessageIfMany(''))
	}

	return (
		<ModalDialog title='Переслать сообщения'
		             open={isVisible}
		             closeFunc={closeFunc}>
			{manyForwardMessage ? <MessageForward forward={manyForwardMessage} count={0} view={true}/>
				:
				<MessageForward forward={messages} count={0} view={true}/>}
		</ModalDialog>
	);
};

export default ViewForwardedMessage;
