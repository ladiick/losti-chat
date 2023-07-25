import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useMatchMedia from "../../../../components/hooks/useMatchMedia";
import ArrowBack from "../../../../components/ui/ArrowBack/ArrowBack";
import Avatar from "../../../../components/ui/Avatar/Avatar";
import Text from "../../../../components/ui/Text/Text";
import WrapperBlocks from "../../../../components/ui/WrapperBlocks/WrapperBlocks";
import BlockNavigation from "../BlockNavigation/BlockNavigation";
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
          <WrapperBlocks title={"Меню"} className={s.block__menu}>
            <WrapperBlocks onClick={() => navigation(`/profile/${user?.id}`)} className={s.block__user}>
              <Avatar image={user?.image} name={{ firstName: user?.first_name, lastName: user?.last_name }} style={{ width: 44, height: 44 }} />
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

            <BlockNavigation />
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
      <WrapperBlocks title={"Меню"} className={s.block__menu}>
        <WrapperBlocks onClick={() => navigation(`/profile/${user?.id}`)} className={s.block__user}>
          <Avatar image={user?.image} name={{ firstName: user?.first_name, lastName: user?.last_name }} style={{ width: 44, height: 44 }} />
          <div className={s.wrapper__info}>
            <div>
              <Text style={{ cursor: "pointer" }}>
                {user?.first_name} {user?.last_name}
              </Text>
            </div>
            <Text
              pointer
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "var(--text--secondary)",
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
