import React from "react";
import { BsSearch } from "react-icons/bs";
import ActionInput from "../ActionInput/ActionInput";
import s from "./SearchBlock.module.scss";

const SearchBlock = ({ searchValue, setSearch }) => {
  return (
    <div className={s.block__search}>
      <ActionInput type="text" placeholder="Поиск" value={searchValue} maxLength="30" onChange={(e) => setSearch(e.target.value)} />
      <BsSearch />
    </div>
  );
};

export default SearchBlock;
