import { GiHamburgerMenu } from 'react-icons/gi'
import s from './HeaderMenu.module.scss'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
const HeaderMenu = () => {
	return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={s.header__burgerBtn}>
          <GiHamburgerMenu size={"1.5rem"} />
        </button>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  );
};

export default HeaderMenu;