import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { ImEnter } from "react-icons/im";

export const noAuthItems = [
  {
    id: 149,
    title: "Зарегистрироваться",
    href: "/registration",
    icon: <BsPersonCircle />,
  },

  {
    id: 150,
    title: "Войти",
    href: "/authorization",
    icon: <ImEnter />,
  },
];

export const helperMessage = (currentObj, preObj) => {
  const currentItem = new Date(currentObj?.time);
  const preItem = new Date(preObj?.time);

  if (
    currentItem.getHours() === preItem.getHours() &&
    Math.abs(currentItem.getMinutes() - preItem.getMinutes()) < 5 &&
    currentObj?.sender?.pk === preObj?.sender?.pk
  ) {
    return true;
  }
  return false;
};
