import React from 'react';
import s from './MessageDate.module.scss'
import {reTime} from "../../actions/reTime";
import Text from '../../ui/Text/Text'
const MessageDate = ({wrapper, message}) => {

	return (
			<div className={`${wrapper} ${s.message__enter_date}`}>
                <Text className={s.date__block} weight={'strong'}>
                    {reTime(message)}
            </Text>
			</div>
	);
};

export default MessageDate;
