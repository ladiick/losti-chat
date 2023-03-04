import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";

import RegistrationFormStep1 from "../../components/RegistrationSteps/RegistrationFormStep1/RegistrationFormStep1";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import RegistrationFormStep4 from "../../components/RegistrationSteps/RegistrationFormStep4/RegistrationFormStep4";
import RegistrationFormStep3 from "../../components/RegistrationSteps/RegistrationFormStep3/RegistrationFormStep3";
import RegistrationFormStep2 from "../../components/RegistrationSteps/RegistrationFormStep2/RegistrationFormStep2";


const Registration = () => {
	const location = useLocation()
	return (
		<FormWrapper>
			{location.pathname === '/registration' && <RegistrationFormStep1/>}
			<Routes>
				<Route path='confirmation-code' element={<RegistrationFormStep2/>}/>
				<Route path='password' element={<RegistrationFormStep3/>}/>
				<Route path='about-user' element={<RegistrationFormStep4/>}/>
			</Routes>
		</FormWrapper>
	);
};

export default Registration;
