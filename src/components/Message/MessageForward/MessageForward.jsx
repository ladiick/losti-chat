import React, {useEffect, useState} from 'react';
import s from "./MessageForward.module.scss";
import {convertTime} from "../../actions/convertTime";
import Text from "../../ui/Text/Text";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../redux/slices/navigationSlice";
import {setForwardMessageIfMany} from "../../../redux/slices/messageSlice";


const MessageForward = ({forward}) => {
	const [counter, setCounter] = useState(0);
	const dispatch = useDispatch()
	const isVisible = useSelector(state => state.navigation.modal.viewForwardMessage)

	useEffect(() => {
		if(counter < 3) {
			setCounter(pre => pre + 1)
		}
	}, [forward]);


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


	const forwardOutput = (forward) => {
		if (Array.isArray(forward)) {
			return forward
		}
		else{
			return forward?.forward

		}
	}

	const openManyForward = (e, obj) => {
		e.stopPropagation()
		console.log(obj)
		dispatch(setForwardMessageIfMany(obj))
		dispatch(openModalBlock({viewForwardMessage: true}))

	}


	return (
		<div className={s.content__message}>
			{forwardOutput(forward)?.map((obj, index, arr) => (
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
					{obj?.message && <Text className={s.message}>{obj?.message}</Text>}

					{obj?.forward?.length !== 0 && <MessageForward forward={obj}/>}
				</div>
			)).reverse()}

		</div>
	);
};

export default React.memo(MessageForward);
