import React from 'react';
import {Oval} from "react-loader-spinner";

const Loader = ({visible,...props}) => {
	return (
		<Oval
			height="32"
			width="32"
			color="#1A73E8"
			secondaryColor="#434343"
			strokeWidth={4}
			strokeWidthSecondary={4}
			visible={visible}
			{...props}
		/>
	);
};

export default Loader;
