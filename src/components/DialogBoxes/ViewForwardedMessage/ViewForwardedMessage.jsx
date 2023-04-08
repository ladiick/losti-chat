import React from 'react';
import ModalDialog from "../../ui/Modal/ModalDialog";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import {Link, useSearchParams} from "react-router-dom";
import s from './ViewForwardedMessage.module.scss'
import Text from "../../ui/Text/Text";
import EmptyImage from "../../ui/EmptyImage/EmptyImage";
import {convertTime} from "../../actions/convertTime";

const ViewForwardedMessage = () => {
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const messages = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.forwardMessage)

	const closeFunc = () => {
		dispatch(openModalBlock({viewForwardMessage: false}))
	}

	return (
		<ModalDialog title='Переслать сообщения'
		             open={isVisible}
		             closeFunc={closeFunc}>
			<div className={s.wrapper__info}>
				{messages?.map(message => (
					<ForwardMessageItem key={message?.id} obj={message}/>
				))}
			</div>
		</ModalDialog>
	);
};


const ForwardMessageItem = ({obj}) => {

	return (
		<div className={s.forwardItem}>
			<div>
				<Link to={`/profile/${obj.sender.pk}`}>
					<EmptyImage
						image={obj.sender.image}
						name={{firstName: obj.sender.first_name, lastName: obj.sender.last_name}}
						style={{width: 36, height: 36, fontSize: 12}}
					/>
				</Link>
			</div>
			<div className={s.info__user__message}>
				<div className={s.info}>
					<Link to={`/profile/${obj.sender.pk}`} className={s.user__name}>
						{obj.sender.first_name}
					</Link>
					<Text className={s.time}>{convertTime(obj.time)}</Text>

				</div>
				<Text className={s.message}>{obj.message}</Text>
			</div>
		</div>
	)
}

export default ViewForwardedMessage;
