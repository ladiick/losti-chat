import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useGetAttachmentsImagesQuery} from "../../../features/attachmentsImagesApiSlice";
import {useSearchParams} from "react-router-dom";
import {rendersImage} from "../../../../utils/outputAttachmentsPhotos";
import PhotosRow from "./PhotosRow";
import {Oval} from "react-loader-spinner";
import Loader from "../../../ui/Loader/Loader";
import {useSelector} from "react-redux";

const OutputImage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const {data, isLoading} = useGetAttachmentsImagesQuery(searchParams?.get('dialogs'))

	const refBlock = useRef();
	const [images, setImages] = useState([]);

	useEffect(() => {
		if(data) {
			const cloneImages = structuredClone(data)
			setImages(rendersImage(cloneImages, refBlock?.current?.clientWidth))
		}
	}, [data]);


	if (isLoading && !data) {
		return <Loader visible={isLoading}/>
	}


	return (
		<div ref={refBlock}>
			{images?.map((row, index) =>
				<PhotosRow key={index} images={row}/>
			)}
		</div>
	)
}

export default OutputImage;
