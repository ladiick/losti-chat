import React from 'react';
import s from './Title.module.scss'

const Title = ({children, className, level = 1, ...props}) => {

	const Tag = `h${level}`
	const classGeneral = className ? `${className} ${s.title}` : s.title


	return (
		<Tag {...props} className={classGeneral}>
			{children}
		</Tag>

	);
};


export default Title;
