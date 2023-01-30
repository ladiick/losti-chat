export const reTime = (time) => {
	const monthRus = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	const currentTime = new Date()
	
	const messageTime = new Date(time)
	
	
	let generalTime = null
	if (currentTime.getDay() === messageTime.getDay()) {
		generalTime = `${messageTime.getHours()}:${messageTime.getMinutes()}`
		if (messageTime.getMinutes() < 10) {
			generalTime = `${messageTime.getHours()}:0${messageTime.getMinutes()}`
		}
	}
	
	if (currentTime.getDate() - 1 === messageTime.getDate()) {
		generalTime = `Вчера`
	}
	if (currentTime.getDate() === messageTime.getDate()) {
		generalTime = `Сегодня`
	}
	
	if (currentTime.getDay() - 1 !== messageTime.getDay() - 1) {
		generalTime = `${messageTime.getDate()} ${monthRus[messageTime.getMonth()]}`
	}
	console.log(generalTime)
	return generalTime
	
}
