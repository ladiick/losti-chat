import React, {useEffect} from 'react';
import s from './Home.module.scss'
import Navigation from "../Navigation/Navigation";
import {useSelector} from "react-redux";
import useMatchMedia from "../hooks/useMatchMedia";


const Home = ({children}) => {

	const chatActive = useSelector(state => state.navigation.chat)
	const {isMedia} = useMatchMedia()
const dragOver = useSelector(state => state.navigation.dragOver)

	const onDrop = (e) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = dragOver ? 'copy' :"none";
	}


	if (isMedia) {
		return (
			<div className={s.wrapper}>
				<div className={s.container}>
					{!chatActive && <Navigation/>}
					<div className={s.content}>
						{children}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={s.wrapper}
		     onDrop={() => !!dragOver}
		     onDragOver={onDrop}
		     onDragStart={onDrop}>
			<div className={s.container}>
				<Navigation/>
				<div className={s.content}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Home;
