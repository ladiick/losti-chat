import React from 'react';
import s from "./ProfileInfo.module.scss";
import {HOST} from "../../api/HOST";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {BsFillCameraFill} from "react-icons/bs";
import ProfileInfoAboutUser from "./ProfileInfoAboutUser/ProfileInfoAboutUser";
import WrapperBlocks from "../../ui/WrapperBlocks/WrapperBlocks";
import IndicatorOnline from "../../ui/IndicatorOnline/IndicatorOnline";

const ProfileInfo = ({online,children, image, firstName, lastName}) => {
	const {id} = useParams()
	const myId = useSelector(state => state.user.aboutUser.id)

	return (
		<WrapperBlocks className={s.wrapper}>
			<div className={s.wrapper__block__info}>
				<div className={s.block__info}>
					{id == myId ?
						image ?
							<img src={`${HOST + image}`} alt='logo'/>
							:
							<span className={s.empty__img}
							>Загрузить фото
								{online && <IndicatorOnline sizeIndicator={{right: 15, bottom: 10}}/>}
              </span>
						:
						image ?
							<img src={`${HOST + image}`} alt='logo'/>
							:
							<span className={s.user__noImage}>
                  <BsFillCameraFill/>
								{online && <IndicatorOnline sizeIndicator={{right: 15, bottom: 10}}/>}
              </span>
					}
					<ProfileInfoAboutUser firstName={firstName} lastName={lastName}>
						{children}
					</ProfileInfoAboutUser>
				</div>
			</div>
		</WrapperBlocks>

	);
};

export default ProfileInfo;
