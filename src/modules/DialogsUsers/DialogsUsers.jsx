import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import ActionInput from "../../components/ui/ActionInput/ActionInput";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import MainHeader from "./components/MainHeader/MainHeader";
import Menu from "./components/Menu/Menu";
import People from "./components/People/ListPeople";
const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();
  const dialogsUsersStyles = {
    width: isMobile ? "100%" : "436px",
    position: "relative",
    boxShadow: " 0 2px 7px var(--header-dropDownMenuShadow)",
  };

  return (
    <WrapperBlocks
      header={
        <MainHeader>
          <Menu />
          <ActionInput icon={<BiSearch />} type="text" placeholder="Поиск" value={searchValue} maxLength="30" onChange={(e) => setSearch(e.target.value)} />
        </MainHeader>
      }
      style={dialogsUsersStyles}
    >
      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};

export default DialogsUsers;
