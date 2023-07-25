import s from './ListItems.module.scss'
const ListItems = ({ children,...props }) => {
  return (
    <ul className={s.list__items} {...props}>
      {children}
    </ul>
  );
};

export default ListItems