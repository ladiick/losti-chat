import s from './Social.module.scss'
import People from "../People/People";
import {useState} from "react";

import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBlock from "../SearchBlock/SearchBlock";
import {useSelector} from "react-redux";

const Social = () => {
	const [searchValue, setSearch] = useState('');

	
	return (
		
		<div className={s.wrapper}>
			<span className={s.text}>Чаты</span>
			<SearchBlock searchValue={searchValue} setSearch={setSearch}/>
			<People searchValue={searchValue} setSearch={setSearch}/>
		</div>
	
	)
	
	
}
export default Social