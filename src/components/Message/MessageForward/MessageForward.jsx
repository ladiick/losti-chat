import React, {useEffect, useState} from 'react';
import s from "./MessageForward.module.scss";
import {convertTime} from "../../actions/convertTime";
import Text from "../../ui/Text/Text";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import {setForwardMessageIfMany} from "../../../redux/slices/messageSlice";
import _ from "underscore";
import {helperMessage} from "../../../utils/utils";
import ActionLink from "../../ui/ActionLink/ActionLink";


const MessageForward = ({forward, count, view}) => {
	const dispatch = useDispatch()


	const forwardOutput = (forward) => {
		if (Array.isArray(forward)) {
			return forward
		} else {
			return forward?.forward
		}
	}

	const openManyForward = (e, obj) => {
		e.stopPropagation()
		dispatch(setForwardMessageIfMany(obj))
		dispatch(openModalBlock({viewForwardMessage: true}))
	}


	return (
		<div className={s.content__message}>
			{forwardOutput(forward)?.map((obj, index, arr) => (
				<div className={s.message__wrapper} key={obj?.id}>
					<div className={s.name__time}>
						{helperMessage(arr?.[index], arr?.[index - 1])
							? '' :
							(
								<>
									<ActionLink weight={600} to={`/profile/${obj?.sender?.pk}`}>
										{obj?.sender?.first_name}
									</ActionLink>
									<div className={s.message__forward__time}>
										{convertTime(obj?.time)}
									</div>
								</>
							)
						}

					</div>
					{obj?.message && <Text className={s.message}>{obj?.message}</Text>}

					{view ?
						<MessageForward forward={obj} view={true}/>
						:
						obj?.forward?.length !== 0 && count < 3 ?
							<MessageForward forward={obj} count={count + 1}/>
							: obj?.forward?.length !== 0 ?
							<Text style={{display: 'block'}}
							      type={'button'}
							      onClick={(e)=>openManyForward(e,obj)}>
								Пересланное сообщение
							</Text>
							:
							''
					}

				</div>
			)).reverse()}

		</div>
	);
};

export default React.memo(MessageForward);
