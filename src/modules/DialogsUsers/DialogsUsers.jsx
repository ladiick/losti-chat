import { useState } from "react";
import { BsBookmarks } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import { IconButton } from "../../components/ui/Button/Button";
import SearchBlock from "../../components/ui/SearchBlock/SearchBlock";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import People from "./components/People/ListPeople";
const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();
  const dialogsUsersStyles = {
    width: isMobile ? "100%" : "35%",
    borderRadius: isMobile ? 0 : "12px 0 0 12px",
    position: "relative",
  };

  return (
    <WrapperBlocks title={"Чаты"} block={<BookMark />} style={dialogsUsersStyles}>
      <SearchBlock searchValue={searchValue} setSearch={setSearch} />
      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};
export default DialogsUsers;

const BookMark = () => {
  const [, setSearchParams] = useSearchParams();
  const myId = useSelector((state) => state.user.aboutUser.id);

  return (
    <IconButton onClick={() => setSearchParams({ dialogs: myId })} type={"outline"} title='Избранное'>
      <BsBookmarks strokeWidth={0.5}  />
    </IconButton>
  );
};
