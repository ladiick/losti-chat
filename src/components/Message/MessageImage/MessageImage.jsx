import React from 'react';
import Image from "./Image";

const MessageImage = ({images}) => {

	return (
		<>
			{images?.map(image => <Image
				key={image?.id}
				attachemnts={false}
				idImage={image?.id}/>)}
		</>
	);
};


export default MessageImage;
