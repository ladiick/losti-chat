import s from "./MessageImage.module.scss";
import {useGetImageInMessageQuery} from "../../features/getImageInMessageApiSlice";
import {Oval} from "react-loader-spinner";

const Image = ({idImage,attachemnts, style, ...props}) => {


	const {data, isLoading} = useGetImageInMessageQuery(idImage, {
		skip: !idImage
	})



	if (!data) {
		return (
			<Oval visible={isLoading}/>
		)
	}


	if (attachemnts) {
		return (
			<div className={s.wrapper__attachments__images} style={style}>
				<img src={data} alt={'pictures'} />
			</div>
		)
	}


	return (
		<div className={s.wrapper__image} style={style}>
			<img src={data} alt={'pictures'}/>
		</div>
	);
};

export default Image;
