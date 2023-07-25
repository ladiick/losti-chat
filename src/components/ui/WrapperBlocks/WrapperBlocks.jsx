import React from 'react';
import s from './WrapperBlocks.module.scss'
import Title from '../Title/Title'
const WrapperBlocks = ({title,children,className,...props}) => {

	const classGeneral = className ? `${className} ${s.wrapper}` : s.wrapper

	return (
    <div className={classGeneral} {...props}>
      {title && <Title size={16} style={{marginBottom: 20}}>{title}</Title>}
      {children}
    </div>
  );
};

export default WrapperBlocks;
