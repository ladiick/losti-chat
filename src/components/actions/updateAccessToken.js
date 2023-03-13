import axios from "axios";
import { HOST } from '../api/HOST';
export const updateAccessToken =  async (userRefreshToken)=>{
	
	const {data} = await axios.post(`${HOST}/api/v1/token/refresh/`, {
		refresh: userRefreshToken
	})
	localStorage.setItem('accessToken', data.access)
	return data.access
	
	
	
}