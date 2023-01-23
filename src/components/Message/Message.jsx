import s from './Message.module.scss';


const Message = ()=>{


	return(

		<div className={s.message}>

			<span>
				message
				<div className={s.message__time}>Today, 8.34pm</div>
			</span>


		</div>
	)
}

export default Message



