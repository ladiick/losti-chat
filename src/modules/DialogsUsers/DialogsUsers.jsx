import { useState } from "react";
import People from "./components/People/ListPeople";
import SearchBlock from "../../components/SearchBlock/SearchBlock";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import Title from "../../components/ui/Title/Title";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";

const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();

  const dialogsUsersStyles = {
    width: isMobile ? "100%" : "35%",
    borderRadius: isMobile ? 0 : "12px 0 0 12px",
    position: "relative",
  };

  return (
    <WrapperBlocks style={dialogsUsersStyles}>
      <Title level={4} style={{ marginBottom: 20 }}>
        Чаты
      </Title>
      <SearchBlock searchValue={searchValue} setSearch={setSearch} />
      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};
export default DialogsUsers;
