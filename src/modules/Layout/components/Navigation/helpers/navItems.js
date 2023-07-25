import { BsPeople } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export const navItems = (myId, countRequests) => {
  return [
    {
      id: 144,
      title: "Моя страница",
      href: `/profile/${myId}`,
      icon: <CgProfile/>,
    },
    {
      id: 145,
      title: "Сообщения",
      href: "/",
      icon: <BiMessageRounded />,
      count: 1,
    },
    {
      id: 146,
      title: "Друзья",
      href: "/friends",
      icon: <BsPeople />,
      count: countRequests,
    },
    {
      id: 147,
      title: "Уведомления",
      href: "/notification",
      icon: <IoNotificationsOutline />,
      count: 1,
    },
    {
      id: 148,
      title: "Меню",
      href: "/menu",
      icon: <CgMenuGridO />,
    },
  ];
};
