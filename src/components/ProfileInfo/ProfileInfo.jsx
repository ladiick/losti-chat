
import s from './ProfileInfo.module.scss'
import {Link} from "react-router-dom";
import {useGetUserQuery} from "../features/userApiSlice";
import {HOST} from "../api/HOST";
import {FaUserEdit} from "react-icons/fa";

const ProfileInfo = () => {
    const {data} = useGetUserQuery()
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__block__info}>
                <div className={s.block__info}>

                    {data?.image ?
                        <img src={`${HOST+data?.image}`} alt='logo'/>
                    :
                        <span className={s.empty__img}
                        >Загрузить фото</span>
                    }
                    <div className={s.about__user}>

                        <div className={s.wrapper__settings}>
                            <h1 className={s.user__name}>
                                {data?.first_name} {data?.last_name}
                            </h1>

                            <Link className={s.edit__profile}>
                                <FaUserEdit/>
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
