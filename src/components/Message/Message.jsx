import s from './Message.module.scss';
import React, {useEffect, useMemo, useRef} from "react";
import _ from "underscore";
import MessageSender from "./MessageSender/MessageSender";
import MessageDate from "./MessageDate/MessageDate";
import MessageRecipient from "./MessageRecipient/MessageRecipient";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import MessageForward from "./MessageForward/MessageForward";

const Message = ({obj, handlerCurrentMessage}) => {
	const refScrollBlock = useRef(null);
	const currentMessage = useSelector(state => state.message.currentMessage)
	const [searchParams, setSearchParams] = useSearchParams()
	const myId = useSelector(state => state.user.aboutUser.id)
	const param = searchParams.get('dialogs')


	useEffect(() => {
		refScrollBlock?.current?.scrollIntoView(false)
	}, [])


	const activeMessage = useMemo(() => {
		if (currentMessage?.[param]) {
			const index = currentMessage?.[param]?.findIndex(message => _.isEqual(message, obj))

			if (index !== -1) {
				return true
			} else {
				return false
			}
		}

	}, [currentMessage])




	if (obj?.forward?.length) {
		if (obj?.recip?.pk === myId) {
			return <MessageForward
				wrapper={s.wrapper__message}
				who={'sender'}
				forward={obj}
				handlerCurrentMessage={handlerCurrentMessage}
				activeMessage={activeMessage}
			/>
		}
		if (obj?.sender?.pk === myId) {
			return <MessageForward
				wrapper={s.wrapper__message}
				forward={obj}
				handlerCurrentMessage={handlerCurrentMessage}
				activeMessage={activeMessage}
			/>
		}
	}

	if (obj?.recip?.pk === myId) {
		return <MessageSender
			wrapper={s.wrapper__message}
			obj={obj}
			handlerCurrentMessage={handlerCurrentMessage}
			activeMessage={activeMessage}
		/>
	}

	if (obj?.sender?.pk === myId) {
		return <MessageRecipient
			wrapper={s.wrapper__message}
			obj={obj}
			handlerCurrentMessage={handlerCurrentMessage}
			activeMessage={activeMessage}
		/>
	}

	if (obj?.type === 'Date') {
		return <MessageDate
			wrapper={s.wrapper__message}
			message={obj.message}
		/>
	}

}

export default React.memo(Message)




