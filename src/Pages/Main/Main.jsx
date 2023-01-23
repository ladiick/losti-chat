import s from './Main.module.scss'
import Navigation from "../../components/Navigation/Navigation";
import Social from "../../components/Social/Social";
import Chat from "../../components/Chat/Chat";
import logo from "../../components/assets/logo.svg";

const Main = () => {
	
	
	return (
		<>
			<div className={s.wrapper}>
				
				<div className={s.container}>
					<div className={s.name__company}>
					<span>
						<img src={logo} alt='logo'/>
						<h1>LOSTI-CHAT</h1>
					</span>
					</div>
					<div className={s.content}>
						<Navigation/>
						<Social/>
						<Chat/>
					</div>
				</div>
			</div>
		
		</>
	)
	
}

export default Main