import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import FormWrapper from "../../components/FormWrapper/FormWrapper";


const Registration = () => {
	useEffect(()=>{
		document.title = 'Регистрация'
	},[])
	return (
		<FormWrapper>
			<Outlet/>
		</FormWrapper>
	);
};

export default Registration;
