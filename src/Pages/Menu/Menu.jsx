import React, {useEffect} from 'react';
import BlockNavigation from "../../components/ui/BlockNavigation/BlockNavigation";
import MenuOptions from "../../components/MenuOptions/MenuOptions";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import {menuItems} from "../../utils/utils";

const Menu = () => {
	const {isMobile} = useMatchMedia()
	useEffect(()=>{
		document.title = 'Меню'
	},[])
	return (
		<>
			<MenuOptions/>
			{!isMobile && <BlockNavigation
				items={menuItems}
				style={{width: '35%',height:'fit-content'}}/>}
		</>
	);
};


export default Menu;
