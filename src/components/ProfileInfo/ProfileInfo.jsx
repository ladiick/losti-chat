import { useSelector } from 'react-redux'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import photo from '../assets/my_photo.jpg'
import s from './ProfileInfo.module.scss'

const ProfileInfo = () => {
	const user = useSelector(state => state.user.aboutUser)
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper__block__info}>
				<div className={s.block__info}>
					<img src={photo} alt='logo' />
					<div className={s.about__user}>
						<h1 className={s.user__name}>
							{user.first_name} {user.last_name}
						</h1>
						<button className={s.edit__profile}>
							Редактировать профиль
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
