
export const reTime = (time, flag = '') => {
	const currentTime = new Date()
	const messageTime = new Date(time)
	
	const options = {
		
		hour: 'numeric',
		minute: '2-digit',
	}
	const options2 = {
		weekday: 'long',
		day: '2-digit',
		
	}
	const options3 = {
		weekday: 'short',
		day: '2-digit',
		year: 'numeric',
		
	}
	
	
	if (currentTime.getDate() === messageTime.getDate() && flag === 'chat') {
		return 'Cегодня'
	}
	if (currentTime.getDate() === messageTime.getDate() && flag === 'people') {
		const generalTime = new Intl.DateTimeFormat('ru', options)
		return generalTime.format(messageTime)
	}
	if (currentTime.getDate() - 1 === messageTime.getDate()) {
		return 'Вчера'
	}
	if(currentTime.getFullYear() !== messageTime.getFullYear()){
		const time = new Intl.DateTimeFormat('ru', options3)
		return time.format(messageTime)
	}
	
	const generalTime2 = new Intl.DateTimeFormat('ru', options2)
	return generalTime2.format(messageTime)
	
	
}
