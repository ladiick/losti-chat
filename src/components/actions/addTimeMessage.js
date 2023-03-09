export const addTimeMessage = (data=[])=>{

	const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Субботу', 'Воскресенье']
	let time = null
	let timeObj = null
	
	for(let i = 0; i < data.length; i++){
		
		timeObj =
			`${new Date(data[i].time).getFullYear()}-${new Date(data[i].time).getMonth()+1}-${new Date(data[i].time).getDate()}`
		
		if(time===null) {
			time = timeObj
			continue
		}
		
		if(time !== timeObj){
			
			let obj = {
				message: time,
				type: 'Date',
				time: timeObj
			}
			
			data.splice(i,0,obj)
			i++
			
			time = timeObj
		}
		
		
	}
	
	let obj_2 = {
		message: timeObj,
		type: 'Date',
		time: data[data.length-1].time
	}
	data.push(obj_2)
	return data

}