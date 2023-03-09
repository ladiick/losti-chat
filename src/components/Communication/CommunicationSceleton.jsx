import React from 'react';
import ContentLoader from "react-content-loader"

const CommunicationSceleton = () => {
	return (
		<ContentLoader viewBox="0 0 550 160" height={160} width={550}>
			<rect x="20" y="12" rx="5" ry="5" width="220" height="10" />
			<rect x="20" y="29" rx="5" ry="5" width="220" height="10" />
			<rect x="320" y="76" rx="5" ry="5" width="220" height="10" />
			<rect x="320" y="58" rx="5" ry="5" width="220" height="10" />
			<rect x="20" y="104" rx="5" ry="5" width="220" height="10" />
			<rect x="20" y="122" rx="5" ry="5" width="220" height="10" />
		</ContentLoader>
	)
};

export default CommunicationSceleton;
