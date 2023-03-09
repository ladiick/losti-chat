import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import MyFriends from './../../components/MyFriends/MyFriends'
import s from './Profile.module.scss'

const Profile = () => {
	return (
		<>
			<div className={s.wrapper__friends}>
				<ProfileInfo/>
				<div className={s.my_friends__photo_block}>
					<div className={s.photo}>Здесь фото блок</div>
					{/*<div>Друзья</div>*/}
					<div className={s.friend}>
					<MyFriends/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
