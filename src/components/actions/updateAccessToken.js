import axios from "axios";

export const updateAccessToken =  async (userRefreshToken)=>{
	
	const {data} = await axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
		refresh: userRefreshToken
	})
	localStorage.setItem('accessToken', data.access)
	return data.access
	
	
	
}