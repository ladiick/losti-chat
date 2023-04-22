import React from 'react';
import s from './MenuOptions.module.scss'
import Title from "../ui/Title/Title";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import {useSelector} from "react-redux";
import Text from '../ui/Text/Text'
import {MdKeyboardArrowRight, MdOutlineLogout} from "react-icons/md";
import useMatchMedia from "../hooks/useMatchMedia";
import BlockNavigation from "../ui/BlockNavigation/BlockNavigation";
import NavigationSlice from "../../redux/slices/navigationSlice";
import NavigationItem from "../Navigation/NavigationItem/NavigationItem";
import {CgProfile} from "react-icons/cg";
import {menuItems} from "../../utils/utils";
import ArrowBack from "../ui/ArrowBack/ArrowBack";

// const navObj = {
// 	id: 300,
// 	title: 'Выход',
// 	href: `/logout`,
// 	icon: <MdOutlineLogout/>,
// }
const MenuOptions = () => {
	const user = useSelector(state => state.user.aboutUser)
	const navigation = useNavigate()
	const {isMobile} = useMatchMedia()
	const location = useLocation()

	if (isMobile) {
		return (
			<>

				{location.pathname === '/menu' ?
					<WrapperBlocks className={s.block__menu}>
						<Title level={4} style={{marginBottom: 10}}>Меню</Title>

						<WrapperBlocks
							onClick={() => navigation(`/profile/${user?.id}`)}
							className={s.block__user}>
							<EmptyImage
								image={user?.image}
								name={{firstName: user?.first_name, lastName: user?.last_name}}
								style={{width: 44, height: 44}}
							/>
							<div className={s.wrapper__info}>
								<div>
									<Text>{user?.first_name} {user?.last_name}</Text>
								</div>
								<Text>Перейти в профиль</Text>
								<MdKeyboardArrowRight className={s.styleArrow}/>
							</div>
						</WrapperBlocks>

						<BlockNavigation
							style={{padding: 0, marginTop: 10}}
							items={menuItems}
						/>

					</WrapperBlocks>

					:
					<WrapperBlocks>
						<ArrowBack onClick={()=>navigation(-1)}/>
						<Outlet/>
					</WrapperBlocks>
				}
			</>
		)
	}


	return (
		<div className={s.wrapper__menu}>
			<WrapperBlocks className={s.block__menu}>
				<Title level={4} style={{marginBottom: 10}}>Меню</Title>

				<WrapperBlocks
					onClick={() => navigation(`/profile/${user?.id}`)}
					className={s.block__user}>
					<EmptyImage
						image={user?.image}
						name={{firstName: user?.first_name, lastName: user?.last_name}}
						style={{width: 44, height: 44}}
					/>
					<div className={s.wrapper__info}>
						<div>
							<Text style={{cursor: 'pointer'}}>{user?.first_name} {user?.last_name}</Text>
						</div>
						<Text style={{
							marginTop: 6,
							fontSize: 12,
							color: 'var(--text--secondary)',
							cursor: 'pointer'
						}}>Перейти в профиль</Text>
						<MdKeyboardArrowRight className={s.styleArrow}/>
					</div>

				</WrapperBlocks>

			</WrapperBlocks>

			{location.pathname !== '/menu' && <WrapperBlocks>

				<Outlet/>

			</WrapperBlocks>}

		</div>
	);
};

export default MenuOptions;
