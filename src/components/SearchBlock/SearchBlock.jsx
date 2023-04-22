import React from 'react';
import s from "./SearchBlock.module.scss";
import ActionInput from "../ui/ActionInput/ActionInput";
import {BsSearch} from "react-icons/bs";

const SearchBlock = ({searchValue,setSearch}) => {
	return (
		<div className={s.block__search}>
			<ActionInput type='text'
			       placeholder='Поиск'
			       value={searchValue}
				      maxLength="30"
			       onChange={(e) => setSearch(e.target.value)}
			/>
			<BsSearch/>
		</div>
	);
};

export default SearchBlock;
