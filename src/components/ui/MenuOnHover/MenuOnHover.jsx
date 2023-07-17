import React, {useCallback, useState} from 'react';
import WrapperBlocks from "../WrapperBlocks/WrapperBlocks";
import s from "./MenuOnHover.module.scss";


const MenuOnHover = React.memo(({onHover, onHovered, children, className, ...props}) => {

	const [isVisible, setIsVisible] = useState(false);


	const onMouseOver = useCallback(() => {
		setIsVisible(true)
		onHovered(true)
	}, [])

	const onMouseLeave = useCallback(() => {
		setIsVisible(false)
		onHovered(false)
	}, [])

	const classWrapper = className ? `${className} ${s.wrapper__block}` : s.wrapper__block

	return (

		<div className={classWrapper} {...props}>

			<div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
			     style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
				{onHover}
			</div>


			<WrapperBlocks
				style={isVisible ? {visibility: 'visible', opacity: 1}
					: {visibility: 'hidden', opacity: 0}}
				className={s.content__menu}
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}>
				{children}
			</WrapperBlocks>


		</div>

	);
})

export default MenuOnHover;
