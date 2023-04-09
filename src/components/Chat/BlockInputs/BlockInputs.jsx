import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import s from "./BlockInputs.module.scss";
import {AiOutlinePaperClip} from "react-icons/ai";
import ContentEditable from "react-contenteditable";
import {motion} from "framer-motion";
import {BsSend, BsSendSlash} from "react-icons/bs";
import sanitizeHtml from "sanitize-html";
import useMatchMedia from "../../hooks/useMatchMedia";
import {MyContext} from "../../../App";
import {useLocation, useSearchParams} from "react-router-dom";
import BlockForwardMessages from "../BlockForwardMessages/BlockForwardMessages";
import {useDispatch, useSelector} from "react-redux";
import {forwardMessageSendFlag} from "../../../redux/slices/navigationSlice";
import {sendMessagesOnChat} from "../../../redux/slices/messageSlice";

const BlockInputs = () => {
	const {isMobile} = useMatchMedia()
	const {socket, statusSocket} = useContext(MyContext);
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const forwardMessages = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.forwardMessage)

	const content = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.sendMessage || '')

	const refSend = useRef()

	const onContentChange = useCallback(evt => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: {a: ["href"]}
		};
		if (evt.currentTarget.innerHTML.length > 20000) {

			dispatch(sendMessagesOnChat({
				param: searchParams.get('dialogs'),
				message: ''
			}))
		}
		dispatch(sendMessagesOnChat({
			param: searchParams.get('dialogs'),
			message: sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf)
		}))
	}, [searchParams.get('dialogs')])

	console.log(forwardMessages?.map(a=>a.id))
	const sendMessage = () => {

		if (content === '') {
			return
		}

		const countMessage = Math.ceil(content.length / 4000)
		for (let i = 0; i < countMessage; i++) {

			socket?.send(
				JSON.stringify(
					{
						request_id: new Date().getTime(),
						message: content.slice(i * 4000, i * 4000 + 4000),
						action: 'create_dialog_message',
						forward: forwardMessages?.map(a=>a.id),
						recipient: searchParams.get('dialogs'),
					}
				)
			)
		}

		dispatch(sendMessagesOnChat({
			param: searchParams.get('dialogs'),
			message: '',
			forwardMessage: []
		}))

	}
	const handlerKeyDown = (e) => {
		// if(isMobile){
		//     console.log(e)
		//
		// }
		if (!e.shiftKey && e.key === 'Enter') {
			e.preventDefault()
			refSend?.current?.click()
		}
	}

	return (
		<div className={s.wrapper__input}>
			<div className={s.input}>
				<div className={s.form__wrapper}>
					<label className={s.download__file}>
						<AiOutlinePaperClip/>
						<input type='file' className={s.input__file}/>
					</label>

					<div className={s.block__input__message}>
						<ContentEditable
							html={content}
							onKeyDown={handlerKeyDown}
							contentEditable={true}
							className={s.input__message}
							role='textbox'
							onChange={onContentChange}
						/>
						{
							content === '' && <motion.span
								initial={{
									x: 20,
									opacity: 0
								}}
								animate={{
									x: 0,
									opacity: 1
								}}
								className={s.placeholder}>Напишите сообщение...</motion.span>
						}
					</div>


					<div
						ref={refSend}
						onClick={sendMessage}
						className={s.button__send}>
						{statusSocket === 'ready' ? <BsSend/> : <BsSendSlash/>}
					</div>
				</div>
			</div>

			{forwardMessages && forwardMessages.length !== 0
				&&
				<BlockForwardMessages
					message={forwardMessages}
				/>

			}
		</div>
	);
};

export default BlockInputs;
