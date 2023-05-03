import React, {useState} from 'react';
import s from './DragAndDropFileUpload.module.scss'
import {TbFiles} from "react-icons/tb";
import Text from "../../ui/Text/Text";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {setDragOver} from "../../../redux/slices/navigationSlice";
import {useSearchParams} from "react-router-dom";
import {sendMessagesOnChat} from "../../../redux/slices/messageSlice";

const DragAndDropFileUpload = ({children, style}) => {
	const [visibleDragAndDrop, setVisibleDragAndDrop] = useState(false)
	const dispatch = useDispatch()
	const [searchParams, setSearchParams] = useSearchParams()

	const file = useSelector(state => state.message.sendMessageOnChat?.[searchParams.get('dialogs')]?.file)

	console.log(file)


	const dragStartHandler = (e) => {
		e.preventDefault()
		dispatch(setDragOver(true))
		setVisibleDragAndDrop(true)
	}

	const dragLeaveHandler = (e) => {
		e.preventDefault()
		setVisibleDragAndDrop(false)
		dispatch(setDragOver(false))
	}

	const onDropHandler = (file) => {
		console.log(file)
		setVisibleDragAndDrop(false)
		dispatch(setDragOver(false))
		dispatch(sendMessagesOnChat(
			{
				param: searchParams.get('dialogs'),
				file
			}
		))

	}


	return (

		<>
			<Dropzone
				maxFiles={10}
				noClick={true}
				noKeyboard={true}
				onDrop={onDropHandler}
				onDragOver={dragStartHandler}
				onDragEnter={dragStartHandler}
				onDragLeave={dragLeaveHandler}>
				{({getRootProps, getInputProps}) => (

					<div {...getRootProps()} className={s.content__drop} style={style}>
						<input {...getInputProps()} />
						<div className={s.overlay__drop}
						     style={
							     visibleDragAndDrop ?
								     {display: 'flex'}
								     :
								     {display: 'none'}
						     }>
							<div className={s.over__drop}>
								<TbFiles size={106} strokeWidth={0.5}/>
								<Text style={
									{
										marginTop: 10,
										color: 'var(--text--secondary)'
									}
								}>
									Перетащите файлы, чтобы прикрепить их к сообщению
								</Text>
							</div>
						</div>
						{children}

					</div>
				)}


			</Dropzone>


		</>


		//
		// <div
		// 	className={s.content__drop}
		// 	style={style}
		// 	onDragStart={(e) => dragStartHandler(e)}
		// 	onDragOver={(e) => dragStartHandler(e)}
		// 	onDrop={(e) => onDropHandler(e)}>
		//
		//
		// 	<div className={s.over__drop}
		// 	     onDragStart={(e) => dragStartHandler(e)}
		// 	     onDragOver={(e) => dragStartHandler(e)}
		// 	     onDragLeave={(e) => dragLeaveHandler(e)}
		// 	     style={
		// 		     visibleDragAndDrop ?
		// 			     {display: 'block'}
		// 			     :
		// 			     {display: 'none'}
		// 	     }>
		// 		<div className={s.drop__zone}
		// 		     style={
		// 			     visibleDragAndDrop ?
		// 				     {background: 'var(--background--content--secondary--hover)',
		// 				     border: 'solid'
		// 				     }
		// 				     : {}
		// 		     }>
		// 			<TbFiles size={106} strokeWidth={0.5} pointerEvents={'none'}/>
		// 			<Text style={
		// 				{
		// 					marginTop: 10,
		// 					color: 'var(--text--secondary)'
		// 				}
		// 			}>
		// 				Перетащите файлы, чтобы прикрепить их к сообщению
		// 			</Text>
		// 		</div>
		// 	</div>
		//
		//
		// 	{children}
		//
		// </div>

	);
};

export default DragAndDropFileUpload;
