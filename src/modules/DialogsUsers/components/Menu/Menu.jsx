import { GiHamburgerMenu } from 'react-icons/gi'
import s from './Menu.module.scss'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Typography from '../../../../components/ui/Typography/Typography'
import { FiBookmark, FiUsers } from "react-icons/fi";
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const HeaderMenu = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const myId = useSelector(state=>state.user.aboutUser.id)
  const moveFavorite = () => {
    setSearchParams({'dialogs': myId});
  }

	return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.header__burgerBtn}>
          <GiHamburgerMenu  />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropMenu__content} sideOffset={10} alignOffset={6} align="start">
          <DropdownMenu.Item className={s.dropMenu__item} onClick={moveFavorite}>
            <FiBookmark />
            <Typography level="bodyS" weight="medium">
              Избранное
            </Typography>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={s.dropMenu__item} onClick={moveFavorite}>
            <FiUsers />
            <Typography level="bodyS" weight="medium">
              Друзья
            </Typography>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HeaderMenu;