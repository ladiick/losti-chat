import { useDispatch, useSelector } from 'react-redux'
import Chat from '../../components/Chat/Chat'
import Home from '../../components/Home/Home'
import Social from '../../components/Social/Social'

const Main = () => {
	const dispatch = useDispatch()
	const chatToggle = useSelector(state => state.navigation.chat)

	if (window.screen.width <= 768) {
		return <Home>{chatToggle ? <Social /> : <Chat />}</Home>
	}

	return (
		<Home>
			<Social />
			<Chat />
		</Home>
	)
}

export default Main
