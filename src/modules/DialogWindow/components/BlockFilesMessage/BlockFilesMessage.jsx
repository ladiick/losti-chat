import React, {useState} from 'react';

const BlockFilesMessage = ({files}) => {
	const [image, setImage] = useState("");

	// const onImageChange = event => {
	// 	if (event.target.files && event.target.files[0]) {
	// 		let reader = new FileReader();
	// 		let file = event.target.files[0];
	// 		reader.onloadend = () => {
	// 			setImage({
	// 				...image, imagePreview: reader.result, file: file
	// 			});
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };
	//


	return (
		<div>

		</div>
	);
};

export default BlockFilesMessage;
