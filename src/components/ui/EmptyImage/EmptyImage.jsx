import React from 'react';
import {HOST} from "../../api/HOST";
import s from "./EmptyImage.module.scss";
import {changeColor} from "../../actions/changeColor";
import IndicatorOnline from "../IndicatorOnline/IndicatorOnline";

const EmptyImage = ({sizeIndicator,noOnline,image, name = {}, index, style = {}}) => {

	return (
		<div style={{position: 'relative'}}>
			{!!image ? <img src={`${HOST + image}`} alt="avatar" style={style} className={s.img}/>
				:
				<span className={s.empty__img}
				      style={{...style, backgroundColor: changeColor(index)}}
				>{name?.firstName?.[0]}{name?.lastName?.[0]}</span>
			}
        {noOnline && <IndicatorOnline sizeIndicator={sizeIndicator}/>}
		</div>
	);
};

export default EmptyImage;
