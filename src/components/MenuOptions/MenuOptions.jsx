import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/utils";
import useMatchMedia from "../hooks/useMatchMedia";
import ArrowBack from "../ui/ArrowBack/ArrowBack";
import BlockNavigation from "../ui/BlockNavigation/BlockNavigation";
import EmptyImage from "../ui/EmptyImage/EmptyImage";
import Text from "../ui/Text/Text";
import Title from "../ui/Title/Title";
import WrapperBlocks from "../ui/WrapperBlocks/WrapperBlocks";
import s from "./MenuOptions.module.scss";


const MenuOptions = () => {
  const user = useSelector((state) => state.user.aboutUser);
  const navigation = useNavigate();
  const { isMobile } = useMatchMedia();
  const location = useLocation();

  if (isMobile) {
    return (
      <>
        {location.pathname === "/menu" ? (
          <WrapperBlocks className={s.block__menu}>
            <Title level={4} style={{ marginBottom: 10 }}>
              Меню
            </Title>

            <WrapperBlocks onClick={() => navigation(`/profile/${user?.id}`)} className={s.block__user}>
              <EmptyImage image={user?.image} name={{ firstName: user?.first_name, lastName: user?.last_name }} style={{ width: 44, height: 44 }} />
              <div className={s.wrapper__info}>
                <div>
                  <Text>
                    {user?.first_name} {user?.last_name}
                  </Text>
                </div>
                <Text>Перейти в профиль</Text>
                <MdKeyboardArrowRight className={s.styleArrow} />
              </div>
            </WrapperBlocks>

            <BlockNavigation style={{ padding: 0, marginTop: 10 }} items={menuItems} />
          </WrapperBlocks>
        ) : (
          <WrapperBlocks>
            <ArrowBack onClick={() => navigation(-1)} />
            <Outlet />
          </WrapperBlocks>
        )}
      </>
    );
  }

  return (
    <div className={s.wrapper__menu}>
      <WrapperBlocks className={s.block__menu}>
        <Title level={4} style={{ marginBottom: 10 }}>
          Меню
        </Title>

        <WrapperBlocks onClick={() => navigation(`/profile/${user?.id}`)} className={s.block__user}>
          <EmptyImage image={user?.image} name={{ firstName: user?.first_name, lastName: user?.last_name }} style={{ width: 44, height: 44 }} />
          <div className={s.wrapper__info}>
            <div>
              <Text style={{ cursor: "pointer" }}>
                {user?.first_name} {user?.last_name}
              </Text>
            </div>
            <Text
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "var(--text--secondary)",
                cursor: "pointer",
              }}
            >
              Перейти в профиль
            </Text>
            <MdKeyboardArrowRight className={s.styleArrow} />
          </div>
        </WrapperBlocks>
      </WrapperBlocks>

      {location.pathname !== "/menu" && (
        <WrapperBlocks>
          <Outlet />
        </WrapperBlocks>
      )}
    </div>
  );
};

export default MenuOptions;
