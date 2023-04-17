import React from 'react';
import WrapperBlocks from "../WrapperBlocks/WrapperBlocks";
import s from './BlockNavigation.module.scss'
import {NavLink} from "react-router-dom";
import Text from '../Text/Text'
const BlockNavigation = ({items, ...props}) => {
	return (
		<WrapperBlocks {...props}>
			<ul>
				{items?.map(item => <Item
					key={item.id}
					to={item.to}
					title={item.title}
					icon={item.icon}
					/>
				)}
			</ul>
		</WrapperBlocks>
	);
};


const Item = ({to,title,icon})=>{
	const classActive = ({isActive}) => isActive ? s.active : ''

	return(
		<li className={s.item} title={title}>
			<NavLink to={to} className={classActive}>
				{icon}
				<Text>{title}</Text>
			</NavLink>
		</li>
	)
}


export default BlockNavigation;
