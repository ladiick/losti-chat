import React, {useEffect, useState} from 'react';
import RadioButtonGroup from "../ui/RadioGroup/RadioGroup";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "../../redux/slices/themeSlice";
import {useSetSettingsMutation} from "../features/settingsMeApiSlice";


const names = ['Темная', 'Светлая']
const Appearance = () => {

	const [setSettings, {isLoading}] = useSetSettingsMutation()

	const theme = useSelector(state => state.theme)
	const dispatch = useDispatch()
	const toggleTheme = async (name) => {
		if (name) {
			await setSettings(name === 'Темная' ? 1 : name === 'Светлая' ? 2 : '')
		}

		if (name !== 'Светлая' && theme === 'light') {
			dispatch(setTheme('dark'))
		}

		if (name !== 'Темная' && theme === 'dark') {
			dispatch(setTheme('light'))
		}

		// const next = theme === 'dark' ? 'light' : 'dark'
		// dispatch(setTheme(next))
	};


	return (

		<RadioButtonGroup
			names={names}
			currentIndex={theme === 'light' ? 1 : theme === 'dark' ? 0 : ''}
			title='Темы'
			toggle={toggleTheme}/>

	);
};

export default Appearance;
