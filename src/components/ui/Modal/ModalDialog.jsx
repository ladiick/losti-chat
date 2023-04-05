import React from 'react';
import {Dialog} from "@headlessui/react";
import CloseButton from "../CloseButton/CloseButton";
import {motion} from "framer-motion";
import s from './ModalDialog.module.scss';

const ModalDialog = ({title, open, closeFunc, children}) => {


	return (
		<Dialog open={open} onClose={() => closeFunc()}>
			<motion.div
				initial={{
					opacity: 0
				}}
				animate={{
					opacity: 1
				}}
				className={s.dialog__overlay}>
				<Dialog.Panel className={s.wrapper__content}>
					<header className={s.header}>
						<Dialog.Title className={s.dialog__title}>{title}</Dialog.Title>
						<CloseButton onClick={() => closeFunc()}/>
					</header>
					<div className={s.content}>
						{children}
					</div>
				</Dialog.Panel>
			</motion.div>
		</Dialog>

	);
};

export default ModalDialog;
