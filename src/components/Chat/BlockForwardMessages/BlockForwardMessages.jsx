import React from 'react';
import s from './BlockForwardMessages.module.scss'
import Text from '../../ui/Text/Text'
import {convertTime} from "../../actions/convertTime";
import CloseButton from "../../ui/CloseButton/CloseButton";
import {changeDeclination} from "../../actions/changeDeclination";

const BlockForwardMessages = ({message,many}) => {

    if(many){
        return (
            <div className={s.wrapper__forward__msg}>
                <div className={s.forward__content}>
                    <Text className={s.name__time} weight='strong'>
                        Пересланные сообщения
                    </Text>
                    <Text className={s.message__forward}>
                        {changeDeclination(message,'message')}
                    </Text>
                </div>
                <CloseButton className={s.close__btn} onClick={() => console.log(4343)}/>

            </div>
        )
    }


    return (
        <div className={s.wrapper__forward__msg}>
            <div className={s.forward__content}>

                <Text className={s.name__time} weight='strong'>
                    {message?.sender?.first_name + ' ' + message?.sender?.last_name}
                    <Text className={s.message__time}>{convertTime(message.time)}</Text>
                </Text>

                <Text className={s.message__forward}>{message.message}</Text>
            </div>
            <CloseButton className={s.close__btn} onClick={() => console.log(4343)}/>

        </div>
    );
};

export default BlockForwardMessages;
