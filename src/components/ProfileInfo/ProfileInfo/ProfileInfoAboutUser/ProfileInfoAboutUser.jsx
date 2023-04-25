import React from 'react';
import s from './ProfileInfoAboutUser.module.scss'
import Title from "../../../ui/Title/Title";
const ProfileInfoAboutUser = ({children,firstName,lastName}) => {
    return (
        <div className={s.about__user}>
            <div className={s.wrapper__settings}>
                <Title level={2} size={21} weight={600}>
                    {firstName} {lastName}
                </Title>
                {children}
            </div>
        </div>

    );
};

export default ProfileInfoAboutUser;
