import React from 'react';
import s from "./BlockAnswerMessage.module.scss";
import Text from "../../ui/Text/Text";
import CloseButton from "../../ui/CloseButton/CloseButton";
import {useDispatch} from "react-redux";
import {clearAnswerMessage} from "../../../redux/slices/messageSlice";
import {useSearchParams} from "react-router-dom";
import {convertTime} from "../../actions/convertTime";

const BlockAnswerMessage = ({message}) => {
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const closeForward = () => {
		dispatch(clearAnswerMessage({param: searchParams.get('dialogs')}))
	}


	return (
		<div className={s.wrapper__forward__msg}>
			<div className={s.forward__content}>

				<Text className={s.name__time} weight='strong'>
					{message?.sender?.first_name + ' ' + message?.sender?.last_name}
					<Text className={s.message__time}>
						{convertTime(message?.time)}
					</Text>
				</Text>


				<Text
					className={s.message__forward}>{message?.message}
				</Text>

			</div>
			<CloseButton className={s.close__btn} onClick={() => closeForward()}/>

		</div>
	);
};

export default BlockAnswerMessage;
