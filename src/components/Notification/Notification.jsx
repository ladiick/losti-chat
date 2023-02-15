import React from 'react';
import s from "Notification.module.scss";

const Notification = () => {
	const notification = ()=>{
		setAlert(true)

		setTimeout(()=>{
			setAlert(false)
		},3000)
	}
	return (
		<div className={alert ? s.alert__active : s.alert}>
			Заявка отправлена
		</div>
	);
};

export default Notification;
