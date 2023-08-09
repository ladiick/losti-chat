import React from 'react';
import {Dialog} from "@headlessui/react";
import CloseButton from "../CloseButton/CloseButton";
import {AnimatePresence, motion} from "framer-motion";
import s from './ModalDialog.module.scss';
import {ActionButton} from "../ActionButton/ActionButton";
import Title from "../Title/Title";
import {variantsAnimationModal} from "../../../utils/variantsAnimationModal";

const ModalDialog = ({noOverlay,title, open, closeFunc, children, noFooter}) => {

	return (
		<AnimatePresence>
			{open && (<Dialog
				as='div'
				initialFocus={false}
				open={open} onClose={() => closeFunc()}>
				<motion.div
					initial={'hidden'}
					animate={'visible'}
					exit={'exit'}
					variants={variantsAnimationModal}
					className={noOverlay ? '' : 'dialog__overlay'}>
					<Dialog.Panel className={s.wrapper__content}>
						<header className={s.header}>
							<Dialog.Title className={s.dialog__title} as={Title}>{title}</Dialog.Title>
							<CloseButton onClick={() => closeFunc()}/>
						</header>
						<main className={s.content}>
							{children}
						</main>
						{!noFooter && <footer className={s.footer}>
							<ActionButton onClick={() => closeFunc()}>Закрыть</ActionButton>
						</footer>}
					</Dialog.Panel>
				</motion.div>
			</Dialog>)
			}
		</AnimatePresence>
	);
};

export default ModalDialog;
