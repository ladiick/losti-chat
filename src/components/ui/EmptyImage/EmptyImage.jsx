import React from 'react';
import {HOST} from "../../api/HOST";
import s from "./EmptyImage.module.scss";
import {changeColor} from "../../actions/changeColor";

const EmptyImage = ({image,name={}, index,style={}}) => {

    return (
        <>
            {!!image ? <img src={`${HOST + image}`} alt="avatar" style={style}/>
                :
                <span className={s.empty__img}
                      style={{...style, backgroundColor: changeColor(index)}}
                >{name?.firstName?.[0]}{name?.lastName?.[0]}</span>
            }
        </>
    );
};

export default EmptyImage;
