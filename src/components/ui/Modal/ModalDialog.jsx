import React from 'react';
import {Dialog} from "@headlessui/react";
import CloseButton from "../CloseButton/CloseButton";
import {AnimatePresence, motion} from "framer-motion";
import s from './ModalDialog.module.scss';
import ActionButton from "../ActionButton/ActionButton";

const ModalDialog = ({title, open, closeFunc, children}) => {

	return (
		<AnimatePresence>

			{open && <Dialog open={open} onClose={() => closeFunc()}>
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					className={s.dialog__overlay}>
					<Dialog.Panel className={s.wrapper__content}>
						<header className={s.header}>
							<Dialog.Title className={s.dialog__title}>{title}</Dialog.Title>
							<CloseButton onClick={() => closeFunc()}/>
						</header>
						<main className={s.content}>
							{children}
						</main>
						<footer className={s.footer}>
							<ActionButton onClick={() => closeFunc()}>Закрыть</ActionButton>
						</footer>
					</Dialog.Panel>
				</motion.div>
			</Dialog>}
		</AnimatePresence>
	);
};

export default ModalDialog;
