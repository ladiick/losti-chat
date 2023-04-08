import React from 'react';
import s from "./MessageForward.module.scss";
import {convertTime} from "../../actions/convertTime";
import Text from "../../ui/Text/Text";
import {Link} from "react-router-dom";
import BlockMessage from "../BlockMessage/BlockMessage";


const MessageForward = ({who, forward, handlerCurrentMessage, activeMessage}) => {
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
	console.log(forward)

	if (who === 'sender') {

		return (
			<>
				<BlockMessage
					activeMessage={activeMessage}
					pos='left'
					time={forward.time}
					onClick={handlerCurrentMessage}>
					<Text>Пересланное сообщение</Text>
					<div className={s.wrapper__forward}>
						{forward?.forward?.map((obj) => (
							<span className={s.message} key={`${obj?.id}_forward`}>
                    {obj.message}
								<div className={s.message__info}>
                    <span className={s.message__day}>{convertTime(obj?.time)}</span>
                </div>
              </span>
						))
						}
					</div>

				</BlockMessage>

			</>
		)
	}


	return (
		<>
			<BlockMessage
				pos='right'
				time={forward.time}
				activeMessage={activeMessage}
				onClick={handlerCurrentMessage}>
				<Text style={{display: 'block'}}>Пересланное сообщение</Text>
				<div className={s.content__message}>
					{forward?.forward?.map((obj, index, arr) => (
						<div className={s.message__wrapper} key={`${obj?.id}_forward`}>
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
						</div>
					))}
				</div>
			</BlockMessage>

		</>
	);
};

export default MessageForward;
