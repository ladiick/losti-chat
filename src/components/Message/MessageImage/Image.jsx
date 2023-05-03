import s from "./MessageImage.module.scss";
import {useGetImageInMessageQuery} from "../../features/getImageInMessageApiSlice";
import {Oval} from "react-loader-spinner";
import Loader from "../../ui/Loader/Loader";
import React from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setOpenDetailedImage, setOpenFromDialog} from "../../../redux/slices/navigationSlice";

const Image = React.memo(({idImage, attachments, style}) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const dispatch = useDispatch()

	const {data, isLoading} = useGetImageInMessageQuery(idImage, {
		skip: !idImage
	})

	const detailedImage = (e) => {
		e.stopPropagation()
		dispatch(setOpenDetailedImage(true))
		if (searchParams?.has('history')) {
			dispatch(setOpenFromDialog(false))
		}
		setSearchParams(
			{
				dialogs: searchParams.get('dialogs'),
				history: `${searchParams.get('dialogs')}_photo`,
				photo: `${idImage}`
			}
		)
	}


	// if (isLoading) {
	// 	return (
	// 		<Loader visible={isLoading}/>
	// 	)
	// }


	if (attachments) {
		return (
			<div className={s.wrapper__attachments__images} style={style} onClick={(e) => detailedImage(e)}>
				<img src={data} alt={'pictures'}/>
			</div>
		)
	}


	return (

		<>
			{
				!isLoading ?
					<div className={s.wrapper__image} style={style} onClick={(e) => detailedImage(e)}>
						<img src={data} alt={'pictures'}/>
					</div>
					:
					<div className={s.wrapper__image} style={style} onClick={(e) => detailedImage(e)}>
						<span className={s.loader}></span>
					</div>
			}
		</>
	);
})

export default Image;
