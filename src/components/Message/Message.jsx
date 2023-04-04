import s from './Message.module.scss';
import React, {useEffect, useMemo, useRef} from "react";
import _ from "underscore";
import MessageSender from "./MessageSender/MessageSender";
import MessageDate from "./MessageDate/MessageDate";
import MessageRecipient from "./MessageRecipient/MessageRecipient";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

const Message = ({message, obj, time, who, handlerCurrentMessage}) => {
	const refScrollBlock = useRef(null);
	const currentMessage = useSelector(state => state.message.currentMessage)
	const [searchParams, setSearchParams] = useSearchParams()
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


	if (who === 'sender') {
		return <MessageSender
			wrapper={s.wrapper__message}
			message={message}
			handlerCurrentMessage={handlerCurrentMessage}
			activeMessage={activeMessage}
			time={time}/>
	}

	if (who === 'recipient') {
		return <MessageRecipient
			wrapper={s.wrapper__message}
			message={message}
			handlerCurrentMessage={handlerCurrentMessage}
			activeMessage={activeMessage}
			time={time}

		/>
	}

	if (who === 'Date') {
		return <MessageDate
			wrapper={s.wrapper__message}
			message={message}
		/>
	}

}

export default Message




