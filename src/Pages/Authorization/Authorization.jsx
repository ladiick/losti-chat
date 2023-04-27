
import AuthorizationForm from "../../components/AuthorizationForm/AuthorizationForm";
import React, {useEffect} from "react";
import FormWrapper from "../../components/FormWrapper/FormWrapper";

const Authorization = () => {


	useEffect(()=>{
		document.title = 'Авторизация'
	},[])

	return (
		
		<FormWrapper>
			<AuthorizationForm/>
		</FormWrapper>
	
	)
}


export default Authorization