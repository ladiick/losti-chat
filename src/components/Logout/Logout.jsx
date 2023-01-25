import {useDispatch} from "react-redux";
import {setIsAuth} from "../../redux/slices/userSlice";


export const Logout = () => {
	const dispatch = useDispatch()
	// dispatch(setIsAuth(false))
	localStorage.clear()
	window.location.href = '/authorization'
}


