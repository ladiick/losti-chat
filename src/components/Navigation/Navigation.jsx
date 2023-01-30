import s from './Navigation.module.scss'
import photo from '../assets/my_photo.jpg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import logo from "../assets/logo.svg";

const Navigation = () => {
	const isAuth = useSelector(state => state.user.isAuth)
	
	return (
		<>
			<div className={s.wrapper__navigation}>
				<nav className={s.nav__content}>
					<div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
					</div>
					<ul className={s.list__items}>
						
						{isAuth ?
							<Link to='/profile' title='Профиль'>
								<li className={s.list__item}>
									<img src={photo} alt='logo'/>
									<h2>
										Моя страница
									</h2>
								</li>
							</Link>
							:
							<li className={s.list__item}>
								<svg strokeWidth="1" viewBox="0 0 24 24" fill='none'>
									<path
										d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
										stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
									      stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
									<path
										d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
										stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								<h2>
									Моя страница
								</h2>
							</li>
						}
						
						{
							isAuth &&
							<Link to='/' title='Сообщения'>
								<li className={s.list__item}>
									<svg fill='transparent' stroke='white' enableBackground="new 0 0 24 24" height="24px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="24px"><g><path d="M5.1,22.1c-0.5,0-0.9-0.1-1.4-0.2c-0.3-0.1-0.6-0.3-0.8-0.5l-0.1-0.1c-0.1-0.1-0.2-0.3-0.2-0.4c0-0.2,0.1-0.3,0.3-0.4   c0.8-0.4,1.5-1.1,1.9-1.9C4.9,18.5,5,18.4,5,18.3c-2.8-1.7-4.5-4.4-4.5-7.3c0-5,5.2-9.2,11.5-9.2S23.5,6,23.5,11   c0,5-5.2,9.2-11.5,9.2c-0.6,0-1.3,0-1.9-0.1C8.6,21.4,6.8,22.1,5.1,22.1z"/></g></svg>
									<h2>
										Сообщения
									</h2>
								</li>
							</Link>}
						
						{
							isAuth &&
							<Link to='/' title='Друзья'>
								<li className={s.list__item}>
									<svg fill='white' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<g data-name="Layer 20" id="Layer_20">
											<path
												d="M16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,16,12Z"/>
											<path
												d="M21,31H11a4,4,0,0,1-4-4V24.45a1,1,0,0,1,.63-.92l3.64-1.46A1,1,0,1,1,12,23.93l-3,1.2V27a2,2,0,0,0,2,2H21a2,2,0,0,0,2-2V25.13l-3-1.2a1,1,0,0,1,.74-1.86l3.64,1.46a1,1,0,0,1,.63.92V27A4,4,0,0,1,21,31Z"/>
											<path d="M9,11a5,5,0,1,1,5-5A5,5,0,0,1,9,11ZM9,3a3,3,0,1,0,3,3A3,3,0,0,0,9,3Z"/>
											<path
												d="M8,19.39H5a4,4,0,0,1-4-4V13.64a1,1,0,0,1,.63-.93l3.19-1.25A1,1,0,0,1,6.11,12a1,1,0,0,1-.56,1.3L3,14.32v1.07a2,2,0,0,0,2,2H8a1,1,0,0,1,0,2Z"/>
											<path d="M23,11a5,5,0,1,1,5-5A5,5,0,0,1,23,11Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,23,3Z"/>
											<path
												d="M27,19.39H24a1,1,0,0,1,0-2h3a2,2,0,0,0,2-2V14.32l-2.55-1a1,1,0,0,1-.56-1.3,1,1,0,0,1,1.29-.57l3.19,1.25a1,1,0,0,1,.63.93v1.75A4,4,0,0,1,27,19.39Z"/>
										</g>
									</svg>
									<h2>
										Друзья
									</h2>
								</li>
							</Link>}
						
						{
							isAuth &&
							
							(<Link to='/settings' title='Настройки'>
								<li className={s.list__item}>
									<svg fill='white' viewBox="0 0 128 128">
										<path d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z"/>
										<path
											d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z"/>
									</svg>
									<h2>
										Настройки
									</h2>
								</li>
							</Link>)
							
						}
						
						
						{isAuth ?
							<Link to='/logout' title='Выход'>
								<li className={s.list__item}>
									
									
									<svg fill='white' version="1.1" viewBox="0 0 48 48">
										<g>
											<path
												d="M41.7,23.3l-8.5-8.5c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l6.8,6.8H19.1c-0.6,0-1,0.4-1,1s0.4,1,1,1h19.4l-6.8,6.8   c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l8.5-8.5c0.2-0.2,0.3-0.4,0.3-0.7S41.9,23.5,41.7,23.3z"/>
											<path
												d="M26.1,34.3c-0.5,0-0.9,0.4-0.9,0.9V39c0,0.6-0.5,1.1-1.1,1.1H9c-0.6,0-1.1-0.5-1.1-1.1V9c0-0.6,0.5-1.1,1.1-1.1h15.2   c0.6,0,1.1,0.5,1.1,1.1v3.9c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9V9c0-1.6-1.3-2.9-2.9-2.9H9C7.4,6.1,6.1,7.4,6.1,9v30   c0,1.6,1.3,2.9,2.9,2.9h15.2c1.6,0,2.9-1.3,2.9-2.9v-3.8C27,34.7,26.6,34.3,26.1,34.3z"/>
										</g>
									</svg>
									<h2>
										Выход
									</h2>
								
								</li>
							
							</Link>
							
							:
							<Link to='/authorization' title='Авторизоваться'>
								<li className={s.list__item}>
									
									
									<svg
										fill='white' version="1.1" viewBox="0 0 65 70">
										<g>
											<g>
												<path
													d="M27.1,22.6c5,0,9-4,9-9s-4-9-9-9s-9,4-9,9S22.1,22.6,27.1,22.6z M27.1,7.5c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6    S23.8,7.5,27.1,7.5z"/>
												<path
													d="M40.8,29.8C28.6,22.3,12.7,26,5.1,38.1l2.6,1.6c6.6-10.8,20.6-14.3,31.4-7.7s14.3,20.6,7.7,31.4c-0.1,0.1-0.2,0.3-0.3,0.4    l2.6,1.6C56.6,53.3,52.9,37.4,40.8,29.8z"/>
												<polygon
													points="59.9,20.9 53.8,20.9 53.8,14.8 50.8,14.8 50.8,20.9 44.7,20.9 44.7,23.9 50.8,23.9 50.8,30 53.8,30 53.8,23.9     59.9,23.9   "/>
											</g>
										</g>
									<
								/svg>
									<h2>
										Авторизоваться
									</h2>
								
								</li>
							</Link>
						}
					</ul>
				</nav>
			
			
			</div>
		</>
	)
	
}

export default Navigation