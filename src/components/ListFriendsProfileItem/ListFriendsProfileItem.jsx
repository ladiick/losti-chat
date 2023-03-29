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
                    image={obj?.friend?.image}
                    firstName={obj?.friend?.first_name}
                    lastName={''}
                    index={index}
                    width={isMobile ? 24 : 60}
                    height={isMobile ? 24 : 60}
                    fontSize={isMobile ? 12 : 24}
                    marginRight={0}
                />
                {!isMobile && <span className={s.friend__name}>{obj.friend?.first_name}</span>}

        </Link>

    );
};

export default ListFriendsProfileItem;