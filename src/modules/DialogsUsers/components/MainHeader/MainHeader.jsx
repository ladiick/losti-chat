import s from './MainHeader.module.scss'
const MainHeader = ({ children }) => {
  return <header className={s.dialog__search}>{children}</header>;
};

export default MainHeader;