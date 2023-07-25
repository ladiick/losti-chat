import { useState } from "react";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import People from "./components/People/ListPeople";
import SearchBlock from '../../components/ui/SearchBlock/SearchBlock'

const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();

  const dialogsUsersStyles = {
    width: isMobile ? "100%" : "35%",
    borderRadius: isMobile ? 0 : "12px 0 0 12px",
    position: "relative",
  };

  return (
    <WrapperBlocks title={"Чаты"} style={dialogsUsersStyles}>
      <SearchBlock searchValue={searchValue} setSearch={setSearch} />
      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};
export default DialogsUsers;
