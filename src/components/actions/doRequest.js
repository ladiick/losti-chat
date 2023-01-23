import axios from 'axios'

const doRequest = (
	url,
	userTokenAccess,
	userTokenRefresh,
	method = 'GET',
	obj
) => {
	
	const headers = {}
	
	// if (userTokenAccess) {
	// 	headers['Authorization'] = `JWT ${userTokenAccess}`
	// }
	//
	const res = axios({
		method,
		url,
		headers,
		obj,
	})
	
	// if (res === 401) {
	// 	const res = axios.post('/api/v1/token/refresh/', {
	// 		refresh: userTokenRefresh
	// 	}).then(res => {
	//
	// 		localStorage.setItem('accessToken', res.data)
	// 		// dispatch(setAccessToken(res.data))
	// 	}).catch(err => err.response.status)
	//
	//
	// 	if (res === 401) {
	// 		localStorage.clear()
	// 		window.location.href = '/'
	// 		return
	// 	}
	//
	// 	return res
	//
	// }
	return res
	
	
}

export default doRequest