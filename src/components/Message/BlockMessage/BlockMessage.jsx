import React, {useEffect, useRef} from 'react';
import s from './BlockMessage.module.scss'
import WrapperMessage from "../WrapperMessage/WrapperMessage";
import {BsCheckCircleFill} from "react-icons/bs";
import {MdEdit} from "react-icons/md";
import {FaShare} from "react-icons/fa";
import {motion} from 'framer-motion'

const BlockMessage = ({children, activeMessage, time, pos, ...props}) => {

	const refScrollBlock = useRef(null);
	useEffect(() => {
		refScrollBlock?.current?.scrollIntoView(false)
	}, [])


	const icons = pos === 'right' ?
		<>
			<BsCheckCircleFill/>
			<MdEdit
				title='Редактировать'
				style={{marginLeft: 10, color: 'var(--decription-color)'}}/>
		</>
		: pos === 'left' ?
			<>
				<BsCheckCircleFill style={{margin: '0 10px'}}/>
				<FaShare
					title='Ответить'
					style={{color: 'var(--decription-color)'}}/>
			</>
			:
			''

	const classNameRecipient =
		activeMessage
			? ` ${s.wrapper__message} ${s.wrapper__recipient} ${s.wrapper__recipient__active}`
			: `${s.wrapper__message} ${s.wrapper__recipient}`

	const classNameSender =
		activeMessage
			? ` ${s.wrapper__message} ${s.wrapper__sender} ${s.wrapper__sender__active}`
			: `${s.wrapper__message} ${s.wrapper__sender}`

	const classNameWrapper = pos === 'right' ? classNameRecipient : pos === 'left' ? classNameSender : ''
	const classNameIcons = pos === 'right' ? s.current__message__left : pos === 'left' ? s.current__message__right : ''


	return (
		<motion.div
			initial={{y: "100%", x: '-20%'}}
			animate={{y: 0, x: 0}}
			transition={{ duration: 0.18}}
			ref={refScrollBlock} className={classNameWrapper} {...props}>
			<div className={classNameIcons}>
				{icons}
			</div>
			<WrapperMessage pos={pos} time={time}>
				{children}
			</WrapperMessage>
		</motion.div>
	);
};

export default React.memo(BlockMessage);
