import { Avatar } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../../components/assets/logo.svg";
import Typography from "../../../../components/ui/Typography/Typography";
import s from "./Header.module.scss";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
const Header = () => {
  const avatarUser = useSelector((state) => state.user.aboutUser);
  return (
    <header className={s.header}>
      <div className={s.header__content}>
        <HeaderMenu />
        <div className={s.header__infoUser}>
          <Avatar size="3rem" image={avatarUser?.image} />
          {/* <img src={`${HOST + avatarUSer}`} className={s.header__userAvatar} alt="avatar" /> */}
          <div className={s.about__user}>
            <Typography level="bodyL" weight="medium">
              ladiiick
            </Typography>
          </div>
        </div>
      </div>

      <Link to={"/"} className={s.header__link}>
        <div className={s.header__blockTitle}>
          <img src={logo} className={s.header__logo} alt="logo" />
          <h1 className={s.header__title}>LOSTI-CHAT</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
