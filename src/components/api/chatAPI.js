const subscribers = []

export const chatAPI = {
	
	subscribe(message) {
		subscribers.push(message)
	}
	
};


