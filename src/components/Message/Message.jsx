import s from './Message.module.scss';


const Message = ()=>{


	return(

		<div className={s.message__wrapper}>

			<span className={s.message}>
				mkngjnhjfgnj
				<div className={s.message__info}>
					<span className={s.message__day}>Today,</span>
					<span className={s.message__time}>8.34pm</span>
				</div>
			</span>


		</div>
	)
}

export default Message



