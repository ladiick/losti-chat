import React from "react";
import { NavLink } from "react-router-dom";
import Text from "../../../Text/Text";
import s from "./NavigationItem.module.scss";

const NavigationItem = ({ obj, classContent, style }) => {
  const contentClass = classContent ? `${s.item__content} ${classContent}` : s.item__content;

  return (
    <li className={s.list__item}>
      <NavLink to={obj.href} title={obj.title} end>
        {({ isActive }) => (
          <div className={isActive ? `${s.item__content__active} ${contentClass}` : contentClass} style={style}>
            {obj.icon}
            <Text className={s.text} pointer>
              {obj.title}
            </Text>
            {obj?.count ? <span className={s.quantity}>{obj.count}</span> : ""}
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
