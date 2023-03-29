import React from 'react';
import s from './ProfileInfoAboutUser.module.scss'
const ProfileInfoAboutUser = ({children,firstName,lastName}) => {
    return (
        <div className={s.about__user}>
            <div className={s.wrapper__settings}>
                <h1 className={s.user__name}>
                    {firstName} {lastName}
                </h1>
                {children}
            </div>
        </div>

    );
};

export default ProfileInfoAboutUser;
