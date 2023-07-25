import { CgProfile } from 'react-icons/cg'
import { IoColorPaletteSharp, IoNotificationsOutline } from 'react-icons/io5'
import { MdOutlineLogout } from 'react-icons/md'

export const menuItems = [
  {
    id: 250,
    title: "Аккаунт",
    href: "/menu/edit",
    icon: <CgProfile />,
  },
  {
    id: 251,
    title: "Внешний вид",
    href: "/menu/appearance",
    icon: <IoColorPaletteSharp />,
  },
  {
    id: 252,
    title: "Уведомления",
    href: "/notification",
    icon: <IoNotificationsOutline />,
  },
  {
    id: 253,
    title: "Выход",
    href: `/logout`,
    icon: <MdOutlineLogout />,
  },
];
