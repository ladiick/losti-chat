import React from 'react';
import {HOST} from "../../api/HOST";
import s from "./EmptyImage.module.scss";
import {changeColor} from "../../actions/changeColor";

const EmptyImage = ({image, firstName, lastName, index, width, height, fontSize, marginRight}) => {

    return (
        <>
            {!!image ? <img src={`${HOST + image}`} alt="avatar" style={{width, height,marginRight}}/>
                :
                <span className={s.empty__img}
                      style={{
                          backgroundColor: changeColor(index),
                          width, height, fontSize, marginRight
                      }}
                >{firstName?.[0]}{lastName?.[0]}</span>
            }
        </>
    );
};

export default EmptyImage;
