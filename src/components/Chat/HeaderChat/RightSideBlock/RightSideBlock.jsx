import React from 'react';
import s from "./RightSideBlock.module.scss";
import {BsThreeDots, BsTrash3} from "react-icons/bs";
import {Popover} from "@headlessui/react";
import {motion} from "framer-motion";
import WrapperBlocks from "../../../ui/WrapperBlocks/WrapperBlocks";
import {HiOutlinePhotograph} from "react-icons/hi";
import Text from "../../../ui/Text/Text";
import {useDispatch, useSelector} from "react-redux";
import {openModalBlock} from "../../../../redux/slices/navigationSlice";
import {useSearchParams} from "react-router-dom";


const RightSideBlock = () => {
	const dispatch = useDispatch();
	const viewAttachmentsInDialogs = useSelector(state => state.navigation.modal.viewAttachmentsInDialogs)
	const [searchParams, setSearchParams] = useSearchParams()
	const items = [
		{
			title: 'Показать вложения',
			icon: <HiOutlinePhotograph/>,
			func: () => {
				setSearchParams(
					{
						dialogs: searchParams.get('dialogs'),
						history: `${searchParams.get('dialogs')}_photo`
					}
				)
				dispatch(openModalBlock({viewAttachmentsInDialogs: true}))
			}
		},
		{
			title: 'Очистить диалог',
			icon: <BsTrash3/>
		}
	]

	return (
		<Popover className={s.popover__wrapper}>
			{({open}) => (
				<>
					<Popover.Button className={s.popover__btn}>
						<BsThreeDots/>
					</Popover.Button>

					{!viewAttachmentsInDialogs &&
						<Popover.Panel
							className={s.popover__panel}
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							as={motion.div}>
							<WrapperBlocks style={{padding: 10}}>
								<ul className={s.list}>
									{items?.map(item =>
										<li className={s.item} onClick={item.func} key={item.title}>
											{item?.icon}
											<Text style={{cursor: 'pointer'}}>{item?.title}</Text>
										</li>
									)}
								</ul>
							</WrapperBlocks>
						</Popover.Panel>}

				</>
			)}
		</Popover>
	)

};

export default RightSideBlock;
