import React from 'react';
import useMatchMedia from "../../hooks/useMatchMedia";
import s from "./ArrowBack.module.scss";
import {FiArrowLeft} from "react-icons/fi";

const ArrowBack = ({...props}) => {
	const {isMobile} = useMatchMedia()

	return (
    <>
      {isMobile && (
        <div className={s.arrow__back} {...props}>
          <FiArrowLeft size={24} color={"var(--color--text--main)"} />
        </div>
      )}
    </>
  );
};

export default ArrowBack;
