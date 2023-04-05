import React from 'react';
import ModalDialog from "../../ui/Modal/ModalDialog";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import {useSearchParams} from "react-router-dom";

const ViewForwardedMessage = () => {
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const messages = useSelector(state => state.message.sendMessageOnChat[searchParams.get('dialogs')].forwardMessage)
	console.log(messages)
	const closeFunc = () => {
		dispatch(openModalBlock({viewForwardMessage: false}))
	}

	return (
		<ModalDialog title='Переслать сообщения'
		             open={isVisible}
		             closeFunc={closeFunc}>

			{messages.map(message => (
				<>
					{message.sender.first_name}
					{message.sender.last_name}
					{message.message}
				</>
			))}

		</ModalDialog>
	);
};

export default ViewForwardedMessage;
