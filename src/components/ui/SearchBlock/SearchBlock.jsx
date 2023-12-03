import React from "react";
import ActionInput from "../ActionInput/ActionInput";
import s from "./SearchBlock.module.scss";
import { Search } from "@mui/icons-material";

const SearchBlock = ({ searchValue, setSearch }) => {
  return (
    <div className={s.block__search}>
      <ActionInput
        type="text"
        placeholder="Поиск"
        value={searchValue}
        maxLength="30"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search />
    </div>
  );
};

export default SearchBlock;
