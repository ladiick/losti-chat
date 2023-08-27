import { Search } from "@mui/icons-material";
import { Input } from "@mui/joy";
import { useState } from "react";
import useMatchMedia from "../../components/hooks/useMatchMedia";
import WrapperBlocks from "../../components/ui/WrapperBlocks/WrapperBlocks";
import MainHeader from "./components/MainHeader/MainHeader";
import People from "./components/People/ListPeople";
const DialogsUsers = () => {
  const [searchValue, setSearch] = useState("");
  const { isMobile } = useMatchMedia();

  const dialogsUsersStyles = {
    width: isMobile ? "100%" : "436px",
    position: "relative",
  };

  return (
    <WrapperBlocks style={dialogsUsersStyles}>
      <MainHeader>
        <Input
          fullWidth
          endDecorator={<Search />}
          type="text"
          placeholder="Поиск"
          value={searchValue}
          maxLength="30"
          onChange={({ target: { value } }) => setSearch(value)}
        />
      </MainHeader>
      <People searchValue={searchValue} setSearch={setSearch} />
    </WrapperBlocks>
  );
};

export default DialogsUsers;
