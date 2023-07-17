import React from 'react';
import s from './Title.module.scss'

const Title = ({children, weight,size, className, level = 1, ...props}) => {

	const Tag = `h${level}`

	const selectClass = className ? `${className} ${s.title}` : s.title
	const selectFontSize = size ? `Font--${size} ${s.title}` : `Font--16 ${s.title}`

	const selectWeight = weight
		? `${selectClass} Text--${weight}`
		: ''

	const classGeneral = `${selectClass} ${selectWeight} ${selectFontSize}`

	return (
		<Tag {...props} className={classGeneral}>
			{children}
		</Tag>

	);
};


export default Title;
