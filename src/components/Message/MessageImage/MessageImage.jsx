import React from 'react';

import Image from "./Image";
import s from './MessageImage.module.scss'
const MessageImage = ({images}) => {


	return (
		<>
			{images?.map(idImage => <Image key={idImage} idImage={idImage}/>)}
		</>
	);
};

export default MessageImage;
