import s from './People.module.scss'


import PeopleItem from "../PeopleItem/PeopleItem";
import {useState} from "react";

const People = () => {
	const [search, setSearch] = useState(false);
	
	return (
		<div className={s.block__people}>
			
			<h1 className={s.title__people}>Сообщения</h1>
			
			
			<div className={s.wrapper__items}>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
				<PeopleItem/>
			
			
			</div>
		</div>
	)
	
}

export default People