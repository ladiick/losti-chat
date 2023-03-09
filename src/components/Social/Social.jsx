import s from './Social.module.scss'
import People from "../People/People";
import {useState} from "react";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBlock from "../SearchBlock/SearchBlock";
import {useSelector} from "react-redux";

const Social = () => {
	const [searchValue, setSearch] = useState('');
	const status = useSelector(state => state.people.status)

	
	return (
		
		<div className={s.wrapper}>
			<span className={s.text}>Сообщения</span>
			{/*<BurgerMenu/>*/}
			<SearchBlock searchValue={searchValue} setSearch={setSearch}/>
			{status === 'loading'  && (
				<div className={s.wrapper__load}>
					<div className={s.load}></div>
				</div>
			) }
			<People searchValue={searchValue} setSearch={setSearch}/>
		</div>
	
	)
	
	
}
export default Social