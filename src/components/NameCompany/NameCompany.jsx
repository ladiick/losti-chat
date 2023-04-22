import React from 'react';
import s from "./NameCompany.module.scss";
import logo from "../assets/logo.svg";
import Text from "../ui/Text/Text";
import Title from "../ui/Title/Title";

const NameCompany = ({size,direction,title}) => {
	let styleSize = {}
	let styleDirection = {}
	if(direction === 'column'){
		styleDirection={
			flexDirection:'column',
			justifyContent: 'center',
			alignItems:'center'
		}
		styleSize={
			marginBottom: 20
		}
	}
	if(size){
		styleSize={
			...styleSize,
			width:size,
			height:size
		}
	}

	return (
		<div className={s.wrapper__company} style={styleDirection} >
			<img src={logo} alt='logo' style={styleSize}/>
			<Title level={4}>{title}</Title>
		</div>
	);
};

export default NameCompany;
