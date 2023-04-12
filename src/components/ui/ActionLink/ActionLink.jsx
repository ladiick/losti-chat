import React from 'react';
import {Link} from "react-router-dom";
import Text from '../Text/Text'
import s from './ActionLink.module.scss'

const ActionLink = ({to, children, className, hover, style}) => {

	const classGeneral = className && hover
		? `${className} ${s.hover}`
		: className ? className
			: hover ? s.hover : ''


	return (
		<Link to={to}>
			<Text className={classGeneral} style={style}>{children}</Text>
		</Link>
	);
};

export default ActionLink;
