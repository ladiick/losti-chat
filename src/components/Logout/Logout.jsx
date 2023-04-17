import {useDispatch} from "react-redux";
import {logOut, setIsAuth} from "../../redux/slices/userSlice";



export const Logout = () => {
	const dispatch = useDispatch()
	dispatch(setIsAuth(false))
	localStorage.clear()
	dispatch(logOut())
	window.location.href = '/authorization'
}


