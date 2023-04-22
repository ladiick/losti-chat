import React from 'react';
import s from "./ActionButton.module.scss";
import Text from '../Text/Text'

const ActionButton = ({leftIcon, rightIcon, className, second, children, ...props}) => {

	const classGeneral = className && second
		? `${className} ${s.button__second}`
		: className ? `${className} ${s.button__primary}`
			:
			second ? s.button__second : s.button__primary

	const singleLeftIcon = rightIcon ? s.leftIcon : s.single__icon

	const singleRightsIcon = leftIcon ? s.rightIcon : s.single__icon

	if (!children) {
		return (
			<button className={classGeneral} {...props}>
				<span className={s.content__btn}>
					{leftIcon && <span className={singleLeftIcon}>{leftIcon}</span>}
					{rightIcon && <span className={singleRightsIcon}>{rightIcon}</span>}
				</span>
			</button>
		)
	}


	return (
		<button
			{...props}
			className={classGeneral}>
			<span className={s.content__btn}>
				{leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
				{children ? <span className={s.children}>{children}</span> : ''}
				{rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
			</span>
		</button>

	);
};

export default ActionButton;
