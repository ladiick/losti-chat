import React from 'react';
import s from './Home.module.scss'
import Navigation from "../Navigation/Navigation";

const Home = ({children}) => {
	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<Navigation />
				<div className={s.content}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Home;
