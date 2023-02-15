import Home from '../../components/Home/Home'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import MyFriends from './../../components/MyFriends/MyFriends'
import s from './Profile.module.scss'
const Profile = () => {
	return (
		<Home>
			<ProfileInfo />
			<div className={s.wrapper__friends}>
				<MyFriends />
			</div>
		</Home>
	)
}

export default Profile
