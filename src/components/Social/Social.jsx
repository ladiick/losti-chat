import s from './Social.module.scss'
import People from "../People/People";
import {useState} from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import SearchBlock from "../SearchBlock/SearchBlock";
import {useSelector} from "react-redux";
import Title from "../ui/Title/Title";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";
import useMatchMedia from "../hooks/useMatchMedia";


const Social = () => {
	const [searchValue, setSearch] = useState('');
	const {isMobile} = useMatchMedia()
	const styleSocial = {
		width: isMobile ? '100%' : "35%",
		borderRadius: isMobile ? 0 : "12px 0 0 12px",
		position: "relative",
	}
	
	return (
		
		<WrapperBlocks style={styleSocial}>
			<Title level={4} style={{marginBottom: 20}}>Чаты</Title>
			<SearchBlock searchValue={searchValue} setSearch={setSearch}/>
			<People searchValue={searchValue} setSearch={setSearch}/>
		</WrapperBlocks>
	
	)
	
	
}
export default Social