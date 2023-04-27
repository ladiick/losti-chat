import React, {useRef} from 'react';
import {useGetAttachmentsImagesQuery} from "../../../features/attachmentsImagesApiSlice";
import {useSearchParams} from "react-router-dom";
import {rendersImage} from "../../../../utils/outputAttachmentsPhotos";
import PhotosRow from "./PhotosRow";
import {Oval} from "react-loader-spinner";

const OutputImage = ({images2}) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const {data,isLoading} = useGetAttachmentsImagesQuery(searchParams?.get('dialogs'))

	const refContainer = useRef(null);


	if(!data) {
		return <Oval
			height="32"
			width="32"
			color="#1A73E8"
			secondaryColor="#434343"
			strokeWidth={4}
			strokeWidthSecondary={4}
			visible={isLoading}
		/>
	}


	return (
		<div  ref={refContainer}>
			{rendersImage(structuredClone(data),refContainer?.current?.offsetWidth)?.map((row,index) =>
				<PhotosRow key={index} images={row}/>
			)}
		</div>
	)
}

export default OutputImage;
