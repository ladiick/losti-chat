import React from 'react';
import s from './ListFriendsProfileItem.module.scss'

import useMatchMedia from "../hooks/useMatchMedia";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import {Link} from "react-router-dom";

const ListFriendsProfileItem = ({obj, index}) => {
    const {isMobile} = useMatchMedia()
    return (

        <Link to={`/profile/${obj.friend.pk}`} className={s.wrapper__item}>

            <EmptyImage
                style={{
                    width: isMobile ? 24 : 60,
                    height: isMobile ? 24 : 60,
                    fontSize: isMobile ? 12 : 24,
                    marginRight: 0
                }}
                sizeIndicator={{width:12,height:12,bottom:2,right:2}}
                noOnline={obj?.friend?.online}
                image={obj?.friend?.image}
                name={{firstName: obj?.friend?.first_name, lastName: ''}}
                index={index}
            />
            {!isMobile && <span className={s.friend__name}>{obj.friend?.first_name}</span>}

        </Link>

    );
};

export default ListFriendsProfileItem;