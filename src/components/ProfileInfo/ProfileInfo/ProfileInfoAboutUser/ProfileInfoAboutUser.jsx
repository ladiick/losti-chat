import React from 'react';
import s from './ProfileInfoAboutUser.module.scss'
import Typography from "../../../ui/Typography/Typography";
const ProfileInfoAboutUser = ({children,isLoading,firstName,lastName}) => {



    return (
        <div className={s.about__user}>
            <div className={s.wrapper__settings}>
              {isLoading ?
                <span className={s.loadingTitle}></span>
                :<Typography level={2} size={21} weight={600}>
                {firstName} {lastName}
              </Typography>}
                {children}
            </div>
        </div>

    );
};

export default ProfileInfoAboutUser;
