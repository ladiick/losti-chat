import React from 'react';
import s from "./FormWrapperLabel.module.scss";
import Text from "../../ui/Text/Text";

const FormWrapperLabel = ({errors, title, children, descriptionTitle,...props}) => {
	return (
		<label className={s.label} {...props}>
			<div className={s.wrapper__titles}>
				{errors ?
					<Text className={s.error}>
						{errors?.message}</Text>
					: <Text>{title}</Text>}
				{
					descriptionTitle &&
					descriptionTitle
				}
			</div>
			{children}
		</label>
	);
};

export default FormWrapperLabel;
