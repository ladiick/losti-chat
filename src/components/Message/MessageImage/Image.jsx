import s from "./MessageImage.module.scss";
import {useGetImageInMessageQuery} from "../../features/getImageInMessageApiSlice";

const Image = ({idImage,...props}) => {
	const {data} = useGetImageInMessageQuery(idImage, {
		skip: !idImage
	})

	return (
		<div className={s.wrapper__image} {...props}>
			<img src={data} alt={data}/>
		</div>
	);
};

export default Image;
