import {useSelector} from 'react-redux'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import photo from '../assets/my_photo.jpg'
import s from './ProfileInfo.module.scss'
import {Link, useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const ProfileInfo = () => {
    const user = useSelector(state => state.user.aboutUser)

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__block__info}>
                <div className={s.block__info}>
                    <img src={photo} alt='logo'/>
                    <div className={s.about__user}>

                        <div className={s.wrapper__settings}>
                            <h1 className={s.user__name}>
                                {user.first_name} {user.last_name}
                            </h1>

                            <Link className={s.edit__profile}>
                                Редактировать профиль
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
