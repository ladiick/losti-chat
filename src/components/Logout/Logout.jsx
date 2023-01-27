import {useDispatch} from "react-redux";
import {setIsAuth} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";


export const Logout = () => {
	const dispatch = useDispatch()
	// dispatch(setIsAuth(false))
	localStorage.clear()
	window.location.href = '/authorization'
}


