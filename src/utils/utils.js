import {BsPeople, BsPersonCircle} from "react-icons/bs";
import {ImEnter} from "react-icons/im";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {BiMessageRounded} from "react-icons/bi";
import {IoColorPaletteSharp, IoNotificationsOutline} from "react-icons/io5";
import {CgMenuGridO} from "react-icons/cg";
import {MdOutlineLogout} from "react-icons/md";

export const styleText = (isMobile) => {
	return {
		textAlign: 'left',
		flexGrow: 1,
		paddingLeft: !isMobile ? 10 : 0,
		fontSize: isMobile && 10
	}
}

export const noAuthItems = [
	{
		id: 149,
		title: 'Зарегистрироваться',
		href: '/registration',
		icon: <BsPersonCircle/>,
	},

	{
		id: 150,
		title: 'Войти',
		href: '/authorization',
		icon: <ImEnter/>
	}

]


export const authItems = (myId, countRequests, isMobile) => {

	return [
		{
			id: 144,
			title: 'Моя страница',
			href: `/profile/${myId}`,
			icon: <CgProfile/>,
		},
		{
			id: 145,
			title: 'Сообщения',
			href: '/',
			icon: <BiMessageRounded/>,
			count: 1
		},
		{
			id: 146,
			title: 'Друзья',
			href: '/friends',
			icon: <BsPeople/>,
			count: countRequests
		},
		{
			id: 147,
			title: 'Уведомления',
			href: '',
			icon: <IoNotificationsOutline/>,
			count: 1
		},
		{
			id: 148,
			title: 'Меню',
			href: '/menu',
			icon: <CgMenuGridO/>,
		},


	]
}



export const menuItems = [
	{
		id: 250,
		title: 'Аккаунт',
		to: '/menu/edit',
		icon: <CgProfile/>
	},
	{
		id: 251,
		title: 'Внешний вид',
		to: '/menu/appearance',
		icon: <IoColorPaletteSharp/>
	},
	{
		id: 252,
		title: 'Уведомления',
		to: '/notification',
		icon: <IoNotificationsOutline/>
	},
	{
		id: 253,
		title: 'Выход',
		to: `/logout`,
		icon: <MdOutlineLogout/>,
	}
]


export const helperMessage = (currentObj, preObj) => {
	const currentItem = new Date(currentObj?.time)
	const preItem = new Date(preObj?.time)

	if (currentItem.getHours() === preItem.getHours() &&
		Math.abs(currentItem.getMinutes() - preItem.getMinutes()) < 5 &&
		currentObj?.sender?.pk === preObj?.sender?.pk
	) {
		return true
	}
	return false
}