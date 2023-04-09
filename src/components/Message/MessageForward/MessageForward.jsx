import React, {useEffect, useState} from 'react';
import s from "./MessageForward.module.scss";
import {convertTime} from "../../actions/convertTime";
import Text from "../../ui/Text/Text";
import {Link} from "react-router-dom";
import BlockMessage from "../BlockMessage/BlockMessage";


const MessageForward = ({forward, myKey}) => {
	const [counter, setCounter] = useState(0);

	// useEffect(() => {
	// 	setCounter(pre=>pre+1)
	// }, [forward]);
	const outTime = (currentObj, preObj) => {
		const currentItem = new Date(currentObj?.time)
		const preItem = new Date(preObj?.time)

		if (currentItem.getHours() === preItem.getHours() &&
			Math.abs(currentItem.getMinutes() - preItem.getMinutes()) < 5 &&
			currentObj?.sender?.pk === preObj?.sender?.pk
		) {
			return true
		}
		return false
	}

	return (
		<div className={s.content__message}>
			{forward?.forward?.map((obj, index, arr) => (
					<div className={s.message__wrapper} key={obj?.id}>
						<div className={s.name__time}>
							{outTime(arr?.[index], arr?.[index - 1])
								? '' :
								(
									<>
										<Link to={`/profile/${obj?.sender?.pk}`}>
											{obj?.sender?.first_name}
										</Link>
										<div className={s.message__forward__time}>
											{convertTime(obj?.time)}
										</div>
									</>
								)
							}

						</div>
						<Text className={s.message}>
							{obj?.message}
						</Text>
						{obj?.forward?.length !== 0 ? <MessageForward forward={obj} myKey={`${myKey}_${obj?.id}`}/> : ''}
					</div>
			)).reverse()}

		</div>
	);
};

export default React.memo(MessageForward);
