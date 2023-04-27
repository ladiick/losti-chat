import React, {useRef} from 'react';
import Image from '../../../Message/MessageImage/Image'
const styleRow = {
	display:'flex',
	boxSizing: 'border-box',
	whiteSpace: "nowrap",
	overflow: "hidden",
}

const PhotosRow = ({images}) => {


	console.log(images)

	return (
		<div style={styleRow} aria-label='photos--row'>
			{images?.map(image=><Image
				attachemnts={true}
				style={{width: image?.width, height: image?.height}}
				key={image?.id} idImage={image?.id}/>)}
		</div>
	);
};

export default PhotosRow;
