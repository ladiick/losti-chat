import React from 'react';
import SceletonHeader from "../SceletonHeader";
import favorite from "../../assets/favorite.svg";
import s from "./HeaderChat.module.scss";
import {useNavigate, useSearchParams} from "react-router-dom";
import {openChatBlock} from "../../../redux/slices/navigationSlice";
import {FiArrowLeft} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import useMatchMedia from "../../hooks/useMatchMedia";
import HeaderForwardMessage from "../HeaderForwardMessage/HeaderForwardMessage";
import EmptyImage from "../../ui/EmptyImage/EmptyImage";
import ActionLink from "../../ui/ActionLink/ActionLink";
import Text from '../../ui/Text/Text'

const HeaderChat = ({isLoading, myId, peopleCurrent}) => {

	const dispatch = useDispatch()
	const navigation = useNavigate()
	const chatActive = useSelector(state => state.navigation.chat)
	const currentMessage = useSelector(state => state.message.currentMessage)
	const {isMobile} = useMatchMedia()
	const [searchParams, setSearchParams] = useSearchParams()
	if (isLoading) {
		return (
			<header className={s.header}>
				<SceletonHeader/>
			</header>
		)
	}

	if (currentMessage?.[searchParams.get('dialogs')]?.length && !isMobile) {
		return (
			<HeaderForwardMessage/>
		)
	}

	return (
		<>
			<header className={s.header}>
				<div className={s.left__side}>
					{chatActive && isMobile && <div className={s.arrow__back} onClick={() => {
						navigation('/')
						dispatch(openChatBlock(false))
					}}>
						<FiArrowLeft/>
					</div>}
					<ActionLink to={`/profile/${searchParams.get('dialogs')}`}>
						{searchParams.get('dialogs') == myId ?
							<img
								src={favorite}
								alt="logo"/> :
							<EmptyImage
								noOnline={peopleCurrent?.online}
								style={{width: 30, height: 30, fontSize: 13}}
								name={{firstName: peopleCurrent?.first_name, lastName: peopleCurrent?.last_name}}
								image={peopleCurrent.image}/>
						}
					</ActionLink>

					<div className={s.person__info}>
						<ActionLink
							to={`/profile/${searchParams.get('dialogs')}`}
							noHover
							defaultColor
							size={14}
							weight={500}>
							{searchParams.get('dialogs') == myId ? 'Избранное'
								:
								`${peopleCurrent.first_name} ${peopleCurrent.last_name}`}
						</ActionLink>
						<Text style={{marginLeft: 8, color: 'var(--text--secondary)'}}>
							{peopleCurrent?.online ? 'онлайн' : 'был в сети ...'}
						</Text>
					</div>
				</div>
			</header>
		</>
	)
};

export default React.memo(HeaderChat);