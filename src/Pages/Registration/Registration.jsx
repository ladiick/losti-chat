import React from 'react';
import {Outlet} from "react-router-dom";

import FormWrapper from "../../components/FormWrapper/FormWrapper";


const Registration = () => {

	return (
		<FormWrapper>
			<Outlet/>
		</FormWrapper>
	);
};

export default Registration;
